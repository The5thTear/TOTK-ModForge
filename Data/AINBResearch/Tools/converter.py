import json
try:
    import yaml
except ImportError:
    raise ImportError("DID YOU EVEN TRY TO READ THE INSTRUCTIONS BEFORE YOU DID THIS? GO BACK TO THE GITHUB README AND LEARN TO READ :P")
import ainb
import sys
import os

def ainb_to_json(filepath): # Converts input AINB file to JSON
    with open(filepath, 'rb') as file:
        data = file.read()
    file = ainb.AINB(data)
    with open(file.filename + ".json", 'w', encoding='utf-8') as outfile:
        json.dump(file.output_dict, outfile, ensure_ascii=False, indent=4)

def json_to_ainb(filepath): # Converts input JSON file to AINB
    with open(filepath, 'r', encoding='utf-8') as file:
        data = json.load(file)
    file = ainb.AINB(data, from_dict=True)
    with open(file.filename + ".ainb", 'wb') as outfile:
        file.ToBytes(file, outfile)

def ainb_to_yaml(filepath): # Converts input AINB file to YAML
    with open(filepath, 'rb') as file:
        data = file.read()
    file = ainb.AINB(data)
    with open(file.filename + ".yml", 'w', encoding='utf-8') as outfile:
        yaml.dump(file.output_dict, outfile, sort_keys=False, allow_unicode=True, encoding='utf-8')

def yaml_to_ainb(filepath): # Converts input YAML file to AINB
    with open(filepath, 'r', encoding='utf-8') as file:
        data = yaml.safe_load(file)
    file = ainb.AINB(data, from_dict=True)
    with open(file.filename + ".ainb", 'wb') as outfile:
        file.ToBytes(file, outfile)
        
if __name__ == '__main__':
    if len(sys.argv) > 1:
        if os.path.isdir(sys.argv[2]):
            if sys.argv[1] in ["ainb_to_json", "ainb_to_yaml"]:
                files = [i for i in os.listdir(sys.argv[2]) if os.path.splitext(i)[1] == ".ainb"]
            elif sys.argv[1] == "json_to_ainb":
                files = [i for i in os.listdir(sys.argv[2]) if os.path.splitext(i)[1] == ".json"]
            elif sys.argv[1] == "yaml_to_ainb":
                files = [i for i in os.listdir(sys.argv[2]) if os.path.splitext(i)[1] in [".yml", ".yaml"]]
            for file in files:
                globals()[sys.argv[1]](os.path.join(sys.argv[2], file))
        else:
            globals()[sys.argv[1]](sys.argv[2])
    else:
        sys.argv.append(input("Input command name: "))
        if sys.argv[1].lower() in ["h", "help"]:
            print("Valid Commands: ainb_to_json, json_to_ainb, ainb_to_yaml, yaml_to_ainb")
            sys.argv[1] = input("Input command name: ")
        elif sys.argv[1] not in ["ainb_to_json", "json_to_ainb", "ainb_to_yaml", "yaml_to_ainb"]:
            raise ValueError("Invalid Command")
        if len(sys.argv) > 2:
            if os.path.isdir(sys.argv[2]):
                if sys.argv[1] in ["ainb_to_json", "ainb_to_yaml"]:
                    files = [i for i in os.listdir(sys.argv[2]) if os.path.splitext(i)[1] == ".ainb"]
                elif sys.argv[1] == "json_to_ainb":
                    files = [i for i in os.listdir(sys.argv[2]) if os.path.splitext(i)[1] == ".json"]
                elif sys.argv[1] == "yaml_to_ainb":
                    files = [i for i in os.listdir(sys.argv[2]) if os.path.splitext(i)[1] in [".yml", ".yaml"]]
                for file in files:
                    globals()[sys.argv[1]](os.path.join(sys.argv[2], file))
            else:
                globals()[sys.argv[1]](sys.argv[2])
        else:
            sys.argv.append(input("Input filepath: "))
            if os.path.isdir(sys.argv[2]):
                if sys.argv[1] in ["ainb_to_json", "ainb_to_yaml"]:
                    files = [i for i in os.listdir(sys.argv[2]) if os.path.splitext(i)[1] == ".ainb"]
                elif sys.argv[1] == "json_to_ainb":
                    files = [i for i in os.listdir(sys.argv[2]) if os.path.splitext(i)[1] == ".json"]
                elif sys.argv[1] == "yaml_to_ainb":
                    files = [i for i in os.listdir(sys.argv[2]) if os.path.splitext(i)[1] in [".yml", ".yaml"]]
                for file in files:
                    globals()[sys.argv[1]](os.path.join(sys.argv[2], file))
            else:
                globals()[sys.argv[1]](sys.argv[2])