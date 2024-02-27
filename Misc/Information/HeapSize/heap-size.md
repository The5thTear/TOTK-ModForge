# Ultimate TOTK Modding Guide - Info - Heap Size

!{#ff0000}Some Information In This Article May Be Incorrect!}

## What Is Heap Size?
Heap size refers to the allocated memory space for various game systems and resources in "The Legend of Zelda: Tears of the Kingdom" (TOTK). It is critical for ensuring that each component of the game has enough memory to function efficiently without overburdening the system.

## Why Edit Heap Size?
Modifying heap size is essential for customizing game performance and capabilities. It allows modders to optimize resource allocation based on the specific needs of their mods, such as enhancing graphics, adding new content, or improving AI complexity.

## How To Edit Heap Size
To edit heap size, modders must adjust the values in the Heap Size file. (`romfs/System/HeapSize/Product.Nin_NX_NVN.HeapDef.byml.zs`).

This file contains a list of TOTK's systems, each followed by the size to allocate. While setting these values, consider the following:

- **Balance is Key**: Allocate enough memory to each system to ensure smooth performance, but avoid excessive allocation that might lead to resource wastage or instability.
- **System Requirements**: More complex systems like AI or Graphics may require larger heap sizes compared to simpler ones like Camera or UI.
- **Modding Goals**: Allocate heap size based on what your mod aims to enhance or add to the game. For example, a graphics enhancement mod will need more memory for graphical components.

#### Sample Heap Size Allocations (Hypothetical)
- AI: `{Size: 1500000}` - AI might need more memory for complex behaviors.
- Graphics: `{Size: 3000000}` - High-resolution textures and models require more memory.
- GameSound: `{Size: 10000}` - Depends on the quality and quantity of audio data.
- Physics: `{Size: 200000}` - Ensures smooth physical interactions in the game.

*Note: These values are hypothetical and should be adjusted based on testing and specific mod requirements. Make sure your entries are in bytes...*

#### Final Considerations
- **Testing**: Always test your mod after adjusting heap sizes to ensure stability and performance.
- **Documentation**: Keep a record of changes made for easier troubleshooting and updates.
- **Community Input**: Engage with the modding community for insights and recommendations on optimal heap size allocations.

- **Final Japanese Entries**: There are some entries at the end of the file in Japanese, I have translated them for you here:
```yaml
ゲームグラフィックス: Game Graphics
カリング: Culling
ケミカル: Chemical
ゲームエフェクト: Game Effect
ゲームリアクション: Game Reaction
ゲーム物理: Game Physics
ワールドマネージャ: World Manager
特殊能力システム: Special Ability System
組立システム: Assembly System
草: Grass
```

By following these guidelines and considerations, you can effectively manage heap sizes in TOTK, enhancing the game's performance and their modding experience. Remember, each mod is unique, and heap size allocations may vary significantly based on the mod's specific requirements and goals.
