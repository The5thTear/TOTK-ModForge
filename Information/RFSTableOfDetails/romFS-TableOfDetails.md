# TotK Romfs File Formats

### .aamp - [x]

Parameter files

[Documentation](https://zeldamods.org/wiki/AAMP)

> #### Other Extensions:   
> .baglblm - Binary AGL BLooM   
> .baglccr -  
> .baglclwd -     
> .baglcube -     
> .bagldof -  
> .baglenv - Binary AGL ENVironment   
> .baglenvset - Binary AGL ENVironment SETting    
> .baglfila -     
> .bagllmap -     
> .baglmf -   
> Stores filter data  
> .baglshpp -     
> .baglsky - Binary AGL SKY ???   
> .bgapkginfo -   
> .bgapkglist -   
> .bgenv -    
> .bglght -   
> .bgmsconf -     
> .bgsdw -    
> .bphhb - Binary PHive Helper Bone   
> Stores helper bone data 
> .bptcl - Binary ParTiCLe    
> .bptclconf - Binary ParTiCLe CONFiguration  
### .ainb - AI Node Binary - [x]  
Node-based format for AI/logic  
[Documentation](https://docs.google.com/document/d/1folGjz7Vq5Y44cDYjEHdBS_EJsInUY5MKhGp0wEJihI/edit?usp=sharing)  
### .asb - Animation Sequence Binary - [ ]    
Node-based format for animation sequences   
### .baatarc - Binary Audio ATtenuation ARChive ??? 
Audio attenuation data archive  
### .baev - Binary Animation EVent - [ ]  
Format for animation events 
### .bagst - Binary Audio Group SeTtings - [ ]    
Audio group settings    
[Documentation (v2, TotK is v9)](https://github.com/kinnay/Nintendo-File-Formats/wiki/BAGST-File-Format)  
### .bcul - Binary CULl - [ ] 
Culling data format 
### .beco - Binary Ecosystem - [x]    
Per-coordinate data format  
[Documentation](https://zeldamods.org/wiki/Beco)  
### .bfcpx - Unknown - [ ]    
### .bfevfl - Binary CaFé EVent FLow - [x]    
Event flows and timelines format    
[Documentation](https://zeldamods.org/wiki/BFEVFL) 
### .bflan - Binary CaFé Layout ANimation - [x]   
Layout animation format 
### .bflyt - Binary CaFé LaYouT - [x] 
Layout format   
### .bfotf - Binary CaFé OpenType Font - [x]  
Font format     
### .bfres - Binary CaFé RESource - [x]   
Model, texture, and animation archive format    
Other Extensions:   
.bofx - Binary Occlusion FX     
### .bfsha - Binary CaFé SHAder - [ ]     
Shader format   
### .bhtmp - Binary HeighT MaP - [x]  
Height map data format  
### .blal - Binary Loop Asset List - [x]  
Format for storing hashes of looped audio assets    
[Python Library](https://github.com/GingerAvalanche/blal) 
### .blwp - Unknown - [ ]     
Appears to have multiple versions with the same extension but same eight-byte header    
Tree info   
### .bnsh - Binary NX SHader - [x]    
Shader format   
### .bntx - Binary NX TeXture - [x]   
Texture format  
### .bnvib - Binary NX VIBration - [ ]    
HD Rumble data format   
[Documentation](https://switchbrew.org/wiki/BNVIB)  
### .bphcl - Binary PHive CLoth - [ ]     
Cloth physics format    
### .bphnm - Binary PHive NavMesh - [ ]   
NavMesh data format     
### .bphsc - Binary PHive Statice Compound - [ ]  
### .bphsh - Binary PHive SHape - [ ]     
### .bstar -    
Found in Preload folder, stores strings     
### .bushvt - Unknown - [ ]   
### .bwav - Binary WAVeform - [x]     
Audio format    
[Software](https://vgmstream.org/)    
[Software](https://github.com/ic-scm/openrevolution)    
[Documentation](https://gota7.github.io/Citric-Composer/specs/binaryWav.html)
### .byaml - Binary YAML - [x]    
Binary YAML format  
[Documentation](https://zeldamods.org/wiki/BYML)  
> Other Extensions:     
> .bgyml - Binary Generated YAML ???  
#### V7
> .byml - Binary YAML
### .cai - Combined Actor Info - [x]
Autobuild build format
[Parsing Library](https://www.npmjs.com/package/combined-actor-info)
> Other Extensions:     
> .totkab - Tears Of The Kingdom AutoBuild
>> Has extra header     
### .chunk - CHUNK - [ ]  
Something for caves (chunked meshes?)   
### .crbin - Unknown - [ ]   
Something for caves     
### .cutinfo - CUTscene INFO - [ ]    
### .dpi - Destructible Piece Info - [ ]  
### .extm - Unknown - [ ]    
### .figi - FIGure Info - [ ]     
### .gsh - GX2 SHader - [x]   
Shader format   
[Documentation](https://github.com/kinnay/Nintendo-File-Formats/wiki/Gfx2-File-Format)  
### .glsl - OpenGL Shading Language ??? - [ ]     
Shader format   
### .hght - HeiGHT - [x]  
Height map data format  
[Documentation](https://github.com/handsomematt/botw-modding/blob/master/docs/file_formats/hght.md)  
### .jpg - JPEG - [x]     
Compressed image format     
[Wikipedia Article](https://en.wikipedia.org/wiki/JPEG)   
### .mate - MATErial - [x]    
Material data for terrain   
[Documentation](https://github.com/handsomematt/botw-modding/blob/master/docs/file_formats/mate.md)  
### .mc - Mesh Codec - [ ]    
Compression format based on ZStandard   
[Game Model Extraction Mod (required for model editing)](https://gamebanana.com/tools/13236)     
### .msbt - Message Studio Binary Text - [x]  
Text file format    
[Documentation](https://mk8.tockdom.com/wiki/MSBT_(File_Format))   
[Documentation](https://acmods.org/wiki/New_Horizons:MSBT)   
[MSBT Functions](https://acmods.org/wiki/New_Horizons:MSBT_functions)    
### .png - Portable Network Graphics - [x]    
Image format    
[Implementation Specifications](https://www.w3.org/TR/png-3/)   
### .ptcl - ParTiCLe - [ ]    
Particle effects format     
Embedded in .eset.byml files    
[Partial Documentation](https://wiki.oatmealdome.me/PTCL_(File_Format))   
### .quad - Unknown - [ ]    
### .raw - Unknown - [ ] 
### .rsizetable - Resource Size TABLE - [x]   
Stores size of all resources    
[Parsing Library](https://github.com/EPD-Libraries/restbl)     
### .sarc - Sorted ARChive - [x] 
Archive format  
[Documentation](https://mk8.tockdom.com/wiki/SARC_(File_Format)) 
> Other Extensions:   
> ### .bars - Binary Audio ReSource   
> Audio resource archive, only stores references to .bwav in TotK     
> [Patching Tool](https://github.com/MediaMoots/TOTK_BARS_Tool)   
> ### .bfarc - Binary Font ARChive    
> Font archive    
> ### .bkres - BaKe RESource ???  
> Bake data archive   
> ### .blarc - Binary Layout ARChive  
> Layout archive  
> ### .genvb - Game ENVironment Binary (???)  
> > ### .pack - PACK    
> Parameter file archive  
> ### .ta - Terrain Archive ???   
> Terrain data archive    
### .sav - SAVe - [x]     
Save file data format   
[Save Editor](https://www.marcrobledo.com/savegame-editors/zelda-totk/)     
### .sharcb - SHader ARChive Binary - [x]     
Shader archive format   
[Documentation](https://github.com/kinnay/Nintendo-File-Formats/wiki/SHARCFB-File-Format)  
### .skybin - SKY BINary - [ ]    
### .tscb - Terrain SCene Binary - [x]    
Terrain data format     
[Documentation](https://zeldamods.org/wiki/TSCB)  
### .txt - TeXT - [x]     
Text file   
Self-explanatory    
### .txtg - TeXToGo - [x]     
Texture format  
### .vsts - Volume STatS - [ ]    
Three types (VSTS, GSTS (Grass Stats), CSTS (Cave Stats))   
### .wbr - Weapon BluR - [ ]  
Weapon blur data format     
### .webm - WEBM - [x]    
Video format    
[Wikipedia Article](https://en.wikipedia.org/wiki/WebM)   
### .xlnk - XLiNK2 - [x]  
File format for XLink2 library  
[Parsing Library](https://github.com/shadowninja108/WoomLink)     
> Other Extensions:   
> ### .belnk - Binary ELiNK   
> Format for ELink library    
> ### .bslnk - Binary SLiNK   
> Format for SLink library    
### .zs - ZStandard - [x]     
Compression format  
[Github Repository](https://github.com/facebook/zstd)   
### .zsdic - ZStandard DICtionary - [x]   
Dictionary format for ZStd compression