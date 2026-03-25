using System;
using System.Diagnostics;
using System.Windows.Forms;

internal static class Program {
    [STAThread]
    static void Main() {
        try {
            Process.Start(new ProcessStartInfo("https://explyra.me") { UseShellExecute = true });
        } catch (Exception ex) {
            MessageBox.Show("Failed to open Explyra: " + ex.Message, "Explyra", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}
