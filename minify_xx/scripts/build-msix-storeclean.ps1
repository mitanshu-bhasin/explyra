param(
  [string]$Version = '1.0.1.0',
  [string]$IdentityName = 'Explyra.Explyra',
  [string]$Publisher = 'CN=45999156-0880-44AD-BB00-5BF06F06845F',
  [string]$DisplayName = 'Explyra',
  [switch]$SignPackage = $true
)

$ErrorActionPreference = 'Stop'

$root = Join-Path $PSScriptRoot '..\msix-storeclean'
$app = Join-Path $root 'app'
$assets = Join-Path $app 'Assets'
New-Item -ItemType Directory -Force -Path $assets | Out-Null

$srcIcon = Join-Path $PSScriptRoot '..\nobg.png'
if (-not (Test-Path $srcIcon)) {
  throw 'Icon source nobg.png not found'
}

Copy-Item $srcIcon (Join-Path $assets 'StoreLogo.png') -Force
Copy-Item $srcIcon (Join-Path $assets 'Square44x44Logo.png') -Force
Copy-Item $srcIcon (Join-Path $assets 'Square150x150Logo.png') -Force
Copy-Item $srcIcon (Join-Path $assets 'Wide310x150Logo.png') -Force
Copy-Item $srcIcon (Join-Path $assets 'Square310x310Logo.png') -Force

$launcherCode = @"
using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

internal static class Program {
    [STAThread]
    static void Main() {
        try {
            var url = "https://explyra.me";
            var edgePath = GetEdgePath();

            if (!string.IsNullOrEmpty(edgePath)) {
                Process.Start(new ProcessStartInfo(edgePath, "--app=" + url) {
                    UseShellExecute = false
                });
            } else {
                Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
            }
        } catch (Exception ex) {
            MessageBox.Show("Failed to open Explyra: " + ex.Message, "Explyra", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    static string GetEdgePath() {
        string[] candidates = new[] {
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Microsoft", "Edge", "Application", "msedge.exe"),
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Microsoft", "Edge", "Application", "msedge.exe")
        };

        foreach (var p in candidates) {
            if (File.Exists(p)) return p;
        }

        return null;
    }
}
"@

$launcherPath = Join-Path $app 'ExplyraLauncher.exe'
Add-Type -TypeDefinition $launcherCode -Language CSharp -OutputAssembly $launcherPath -OutputType WindowsApplication -ReferencedAssemblies 'System.dll','System.Windows.Forms.dll'

$manifest = @"
<?xml version="1.0" encoding="utf-8"?>
<Package
  xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
  xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
  IgnorableNamespaces="uap">

  <Identity Name="$IdentityName" Publisher="$Publisher" Version="$Version" />

  <Properties>
    <DisplayName>$DisplayName</DisplayName>
    <PublisherDisplayName>$DisplayName</PublisherDisplayName>
    <Logo>Assets/StoreLogo.png</Logo>
  </Properties>

  <Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.17763.0" MaxVersionTested="10.0.26100.0" />
  </Dependencies>

  <Resources>
    <Resource Language="en-us" />
  </Resources>

  <Applications>
    <Application Id="App" Executable="ExplyraLauncher.exe" EntryPoint="Windows.PartialTrustApplication">
      <uap:VisualElements
        DisplayName="$DisplayName"
        Description="$DisplayName launcher"
        BackgroundColor="transparent"
        Square150x150Logo="Assets/Square150x150Logo.png"
        Square44x44Logo="Assets/Square44x44Logo.png">
        <uap:DefaultTile Wide310x150Logo="Assets/Wide310x150Logo.png" Square310x310Logo="Assets/Square310x310Logo.png" />
      </uap:VisualElements>
    </Application>
  </Applications>
</Package>
"@
Set-Content -Path (Join-Path $app 'AppxManifest.xml') -Value $manifest -Encoding UTF8

$makeappx = 'C:\Program Files (x86)\Windows Kits\10\bin\10.0.26100.0\x64\makeappx.exe'
$signtool = 'C:\Program Files (x86)\Windows Kits\10\bin\10.0.26100.0\x64\signtool.exe'
if (-not (Test-Path $makeappx)) {
  throw 'makeappx not found'
}
if ($SignPackage -and -not (Test-Path $signtool)) {
  throw 'signtool not found'
}

$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$out = Join-Path (Join-Path $PSScriptRoot '..') "Explyra_${Version}_x64_storeclean_${stamp}.msix"
& $makeappx pack /d $app /p $out /o
if ($LASTEXITCODE -ne 0) {
  throw "makeappx failed with exit code $LASTEXITCODE"
}
if (Test-Path $out) {
  Write-Output "MSIX_CREATED: $out"
} else {
  throw 'MSIX was not created'
}

if ($SignPackage) {
  $cert = Get-ChildItem Cert:\CurrentUser\My |
    Where-Object { $_.Subject -eq $Publisher -and $_.HasPrivateKey } |
    Sort-Object NotAfter -Descending |
    Select-Object -First 1

  if (-not $cert) {
    $certParams = @{
      Type = 'Custom'
      Subject = $Publisher
      FriendlyName = "$DisplayName Store Signing"
      CertStoreLocation = 'Cert:\CurrentUser\My'
      KeyAlgorithm = 'RSA'
      KeyLength = 2048
      HashAlgorithm = 'SHA256'
      NotAfter = (Get-Date).AddYears(3)
      KeyExportPolicy = 'Exportable'
      TextExtension = @('2.5.29.37={text}1.3.6.1.5.5.7.3.3')
    }
    $cert = New-SelfSignedCertificate @certParams
  }

  & $signtool sign /fd SHA256 /sha1 $cert.Thumbprint /s My /tr http://timestamp.digicert.com /td SHA256 $out
  if ($LASTEXITCODE -ne 0) {
    throw 'signtool sign failed'
  }

  & $signtool verify /pa $out
  if ($LASTEXITCODE -ne 0) {
    Write-Warning 'signtool verify /pa failed locally (expected for self-signed cert not trusted by this machine root store).'
  }

  Write-Output "MSIX_SIGNED: $out"
}
