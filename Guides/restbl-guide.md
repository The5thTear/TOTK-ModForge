# Ultimate TOTK Modding Guide - The ResourceSizeTable
  
Greetings modders! The ResourceSizeTable can be intimidating for some, but this comprehensive guide is your key to unlocking the world of the ResourceSizeTable in TOTK and beyond.
  
- [Ultimate TOTK Modding Guide - The ResourceSizeTable](#ultimate-totk-modding-guide---the-resourcesizetable)
  - [What Is The ResourceSizeTable?](#what-is-the-resourcesizetable)
  - [The RESTBL Tool](#the-restbl-tool)
    - [GUI Use:](#gui-use)
    - [CLI Use:](#cli-use)

## What Is The ResourceSizeTable?

RESTBL files are used by the game's resource system to decide how much memory it should allocate for each file. Each entry in a RESTBL file contains a CRC32 hash of the corresponding file's path and its allocation size. The allocated size as listed in the RESTBL is not exactly equal to the size of the file, it is slightly larger.

When developing or using mods, the RESTBL oftens becomes an issue as changes to file sizes may lead to the existing RESTBL entry becoming too small. This will result in the game crashing when it attempts to load in said resource. As a result, many mods come with edited RESTBL files, tailored for that specific mod. However issues arise when you have multiple mods all requiring RESTBL edits.
  
## The RESTBL Tool  
  
Lord Bubbles' tool automatically calculates and merges tables from single or multiple mod folders, streamlining the creation of files for mods. In turn, significantly saves developers time by eliminating the need for manual entry.

### GUI Use:  
  

  
### CLI Use:  
  

  