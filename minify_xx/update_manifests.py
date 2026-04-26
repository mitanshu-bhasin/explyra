import json
import os

target_dirs = [
    r'd:\Expense Tracker',
    r'd:\Expense Tracker\minify_xx'
]

# Source of truth
root_manifest_path = r'd:\Expense Tracker\manifest.json'

with open(root_manifest_path, 'r', encoding='utf-8') as f:
    source_manifest = json.load(f)

# Fields to standardize
fields_to_copy = [
    "iarc_rating_id",
    "scope_extensions",
    "categories",
    "file_handlers",
    "protocol_handlers",
    "note_taking",
    "handle_links",
    "launch_handler",
    "edge_side_panel",
    "widgets",
    "share_target",
    "display_override",
    "lang",
    "dir"
]

# Standardize some paths to be root-relative for portability across sub-apps
def standardize_paths(obj):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ['action', 'new_note_url', 'url'] and isinstance(v, str) and v.startswith('./'):
                obj[k] = '/' + v[2:]
            elif k == 'src' and isinstance(v, str) and not v.startswith('http') and not v.startswith('/'):
                obj[k] = '/' + v
            else:
                standardize_paths(v)
    elif isinstance(obj, list):
        for item in obj:
            standardize_paths(item)

standard_data = {}
for field in fields_to_copy:
    if field in source_manifest:
        val = source_manifest[field]
        # Avoid standardizing everything as it might break existing relative paths in sub-apps if they have their own icons
        # But for scope_extensions and widgets, we want them global.
        standard_data[field] = val

# Prepare the data for inclusion
# We'll normalize 'share_target' action as it was relative in source
if "share_target" in standard_data and "action" in standard_data["share_target"]:
    if standard_data["share_target"]["action"] == "./emp.html":
        standard_data["share_target"]["action"] = "/emp.html"

# Normalize widgets paths
if "widgets" in standard_data:
    for w in standard_data["widgets"]:
        if "data" in w and w["data"] == "expense-data.json":
            w["data"] = "/expense-data.json"
        if "ms_ac_template" in w and w["ms_ac_template"] == "expense-summary.json":
            w["ms_ac_template"] = "/expense-summary.json"
        for icon in w.get("icons", []):
            if not icon["src"].startswith('/'): icon["src"] = '/' + icon["src"]
        for ss in w.get("screenshots", []):
            if not ss["src"].startswith('/'): ss["src"] = '/' + ss["src"]

# Normalize file_handlers action
if "file_handlers" in standard_data:
    for fh in standard_data["file_handlers"]:
        if fh["action"].startswith("./"): fh["action"] = "/" + fh["action"][2:]

# Iterate and update all manifest.json in the target dirs
count = 0
for base_dir in target_dirs:
    for root, dirs, files in os.walk(base_dir):
        # Skip node_modules and hidden dirs
        if 'node_modules' in root or '.git' in root or '.venv' in root:
            continue
        
        for file in files:
            if file == 'manifest.json' or file.endswith('.webmanifest'):
                manifest_path = os.path.join(root, file)
                
                try:
                    with open(manifest_path, 'r', encoding='utf-8') as f:
                        m = json.load(f)
                    
                    # Update fields
                    updated = False
                    for field, value in standard_data.items():
                        # If field exists, we might want to merge or override.
                        # For widgets and scope_extensions, we definitely override or add.
                        if field not in m or m[field] != value:
                            m[field] = value
                            updated = True
                    
                    if updated:
                        with open(manifest_path, 'w', encoding='utf-8') as f:
                            json.dump(m, f, indent=2, ensure_ascii=False)
                        print(f"Updated: {manifest_path}")
                        count += 1
                except Exception as e:
                    print(f"Error updating {manifest_path}: {e}")

print(f"Total updated: {count}")
