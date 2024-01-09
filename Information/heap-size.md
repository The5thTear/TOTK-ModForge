# Ultimate TOTK Modding Guide - Info - Heap Size
  
# What Is Heap Size?
# Why Edit Heap Size?
# How To Edit Heap Size

The Heap Size file contains a list of TotK's different systems, followed by the size to allocate.

> ### I cannot share the vanilla file, so these are just the entries with blank values.
  
```
AI: {Size: }
AS: {Size: }
Actor: {Size: }
ActorInstanceHeap: {Parent: Actor, Size: }
AdditionalTexHeapForDevelop: {Parent: DebugHeap, Size: }
AglWork: {Parent: Graphics, Size: }
Bake: {Size: }
Banc: {Size: }
Blackboard: {Size: }
Camera: {Size: }
Cave: {Size: }
Challenge: {Size: }
Controller: {Size: }
DLogBuffer: {Parent: DebugLogger, Size: }
DLogDataStore: {Parent: DebugLogger, Size: }
DebugHeap: {Size: }
DebugLogger: {Parent: DebugHeap, Size: }
DyingMessage: {Size: }
DynamicTextureAllocatorMem: {Parent: Graphics, Size: }
EQS: {Size: }
Effect: {Size: }
Event: {Size: }
Forest: {Size: }
GameCamera: {Size: }
GameData: {Size: }
GameDataMgrInitDataDebug: {Parent: DebugHeap, Size: }
GamePlayReport: {Size: }
GameSound: {Size: }
GameTerrain: {Size: }
GameUI: {Size: }
GameUIUpdate0: {Size: }
GameUIUpdate1: {Size: }
GameXLink: {Size: }
Graphics: {Size: }
LOD: {Size: }
Malloc: {Parent: Reserved, Size: }
MaxDisplayListSize: {Parent: Graphics, Size: }
ModelResourceMgrGpuHeap: {Parent: ゲームグラフィックス, Size: }
ModelWorkBuffer: {Parent: Graphics, Size: }
ModuleSystem: {Size: }
MountRomCache: {Parent: ReservedInFramework, Size: }
NavMeshSystem: {Size: }
NvInitializeGraphics: {Parent: ReservedByFramework, Size: }
Perception: {Size: }
PhiveBackEnd: {Parent: Physics, Size: }
Physics: {Size: }
PlayReport: {Size: }
Program: {Parent: Reserved, Size: }
RSDB: {Size: }
Rail: {Size: }
Reaction: {Size: }
Reserved: {Size: }
ReservedByFramework: {Parent: ReservedInFramework, Size: }
ReservedInFramework: {Parent: Reserved, Size: }
Resource: {Size: }
ResourceDebug: {Parent: aresDebug, Size: }
ResourceDummyGeneralFormatParam: {Parent: Resource, Size: }
ResourceL: {Parent: Resource, Size: }
ResourceS: {Parent: Resource, Size: }
ResourceU: {Parent: Resource, Size: }
Rumble: {Size: }
SaveLoad: {Parent: Scene, Size: }
Scene: {Size: }
SceneHeapParent: {Parent: Scene, Size: }
Sound: {Size: }
System: {Size: }
Terrain: {Size: }
TextureCompactionWorkHeap: {Parent: ゲームグラフィックス, Size: }
TextureHeap: {Parent: ゲームグラフィックス, Size: }
Transceiver: {Size: }
TransceiverExtraInfo: {Parent: Transceiver, Size: }
UI: {Size: }
VirtualAddressMemory: {Parent: Reserved, Size: }
VolumeStats: {Size: }
XLink: {Size: }
aresDebug: {Parent: DebugHeap, Size: }
カリング: {Size: }
ケミカル: {Size: }
ゲームエフェクト: {Size: }
ゲームグラフィックス: {Size: }
ゲームリアクション: {Size: }
ゲーム物理: {Size: }
ワールドマネージャ: {Size: }
特殊能力システム: {Size: }
組立システム: {Size: }
草: {Size: }```