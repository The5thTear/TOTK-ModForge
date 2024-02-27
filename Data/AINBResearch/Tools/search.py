import json
import os

def search_ainb_files(directory, search_mode, node_type=None, node_name=None, flags_to_search=None):
    results = []
    total_files = len([name for name in os.listdir(directory) if name.endswith('.json')])
    processed_files = 0

    with open("search_results.txt", "w", encoding='utf-8') as output_file:
        for filename in os.listdir(directory):
            if filename.endswith('.json'):
                processed_files += 1
                file_status = f"Searching in {filename} ({processed_files}/{total_files} files processed)\n"
                print(file_status)
                output_file.write(file_status)

                with open(os.path.join(directory, filename), 'r', encoding='utf-8') as file:
                    try:
                        data = json.load(file)
                        for node in data.get('Nodes', []):
                            if search_mode == "node":
                                if (node.get('Node Type') == node_type and (node_name is None or node.get('Name') == node_name)):
                                    result = {'file': filename, 'node_index': node.get('Node Index')}
                                    results.append(result)
                                    output_file.write(f"Found {node_type} '{node.get('Name')}' in {filename} at index {result['node_index']}\n")

                            elif search_mode == "flag" and flags_to_search:
                                node_flags = set(node.get('Flags', []))
                                if not node_flags.isdisjoint(flags_to_search):
                                    result = {'file': filename, 'node_index': node.get('Node Index'), 'flags': list(node_flags)}
                                    results.append(result)
                                    output_file.write(f"Found flags in {filename} at index {result['node_index']}\n")
                    except json.JSONDecodeError:
                        error_msg = f"Error reading {filename}\n"
                        print(error_msg)
                        output_file.write(error_msg)
    return results

# Example usage
directory = input("Path of AINB_AS_JSON: ")
search_mode = input("Search mode (node/flag): ")

if search_mode == "node":
    node_type = input("Node Type (Ex: UserDefined): ")
    node_name = input("Node Name (optional, press Enter to skip): ") or None
    search_results = search_ainb_files(directory, search_mode, node_type, node_name)
elif search_mode == "flag":
    flags_input = input("What flags to search for? (Separate multiple flags with a comma): ")
    flags_to_search = set([flag.strip() for flag in flags_input.split(',')])
    search_results = search_ainb_files(directory, search_mode, flags_to_search=flags_to_search)

for result in search_results:
    print(result)

input("Press Enter to exit...")
