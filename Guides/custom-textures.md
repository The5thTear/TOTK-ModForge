# Ultimate TOTK Modding Guide - Custom Textures

Greetings modders! Whether you're new or familiar with textures, this comprehensive guide is your key to unlocking the world of custom textures in TOTK and beyond.

- [Ultimate TOTK Modding Guide - Custom Textures](#ultimate-totk-modding-guide---custom-textures)
  - [1.1: Creating Custom Textures:](#11-creating-custom-textures)
  - [Type Use Cases + Logistics:](#type-use-cases--logistics)
    - [Albedo:](#albedo)
    - [Specular Maps:](#specular-maps)
    - [Normal Maps:](#normal-maps)
    - [Emission Maps:](#emission-maps)
    - [Gn(#):](#gn)
    - [em0:](#em0)

  - [Texture Import Formats:](#texture-import-formats)
    - [Import Types](#import-types)
  - [STB Alpha Option:](#stb-alpha-option)
  - [RESTBL Tool Usage:](#restbl-tool-usage)

  
**Alright, let's get started.**

## 1.1: Creating Custom Textures:

> ### Creating custom textures is incredibly simple, and I'm here to teach you!

***There are multiple texture types, including:***

[Albedo](#albedo)   
[Specular Maps (Spm)](#specular-maps)  
[Normal Maps (Nrm)](#normal-maps)  
[Emission Maps (Emc/Emm)](#emission-maps)  
[Gn*](#gn), and  
[em0](#em0)  

## Type Use Cases + Logistics:

### Albedo:

> #### Known - Used For Textures Color

Albedo textures are used for all forms of color in the game. Albedo textures are basic, but the quality can differ depending on your textures so import settings are important.  
  
See Here: [Section 2 - Texture Import Formats](#texture-import-formats)

### Specular Maps:

> #### Known - Used For Reflectiveness

***Specular textures are used for the shininess or reflectivity of a model.***  
  
## Specular textures are incredibly simple, and there are only 2 valuable pieces of info regarding them:

1. ### Different Specular Colors
  
*Specular Maps can come in a black and white format, or a blue format.*  
  
> *Weapon_Sword_125 - Forest Dwellers Sword - Specular Map (B&W)
  
![B&W Specular Map](/Assets/GuideImages/custom-textures/Weapon_Sword_125_Spm.png)  
  
> *Weapon_Sword_113 - Knight's Broadsword - Specular Map (Blue)
  
![Blue Specular Map](/Assets/GuideImages/custom-textures/Weapon_Sword_113_Spm.png)  
  
### Editing the black and white maps is straightforward (with white being the most shiny and black (transparency) being the least);
  
> *Albedo textures can be used to create them in combination with the [next point](#normalmap-online). However, for blue and white specular textures, it's more efficient to convert them to black and white than to manually edit them in their colored form.*
  
2. ### NormalMap Online
  
> This is a useful tool, both for creating Nrm textures, as well as Spm textures!

*While the interface is dated, it is also intuitive, so feel free to try it out!*

[Normal Map Online](https://cpetry.github.io/NormalMap-Online/)
  
### Normal Maps:

> #### Known - Used For Detail/Reflectiveness Direction
  
### Normal maps are a type of texture used in 3D modeling to simulate the illusion of complex surface details without increasing the model's geometric complexity.  
  
> *They contain information about the directions of surface normals, which are used to alter the way light interacts with the surface, giving a more realistic appearance of bumps and indentations. Essentially, normal maps provide a way to add detailed textures and depth effects efficiently, enhancing the visual richness of 3D objects.*
  
> ### In TotK, similar to Specular maps, there are two types, purple-ish normal maps, and golden normal maps.

**As far as I know, there is no difference between them, and generating them from and Albedo texture is easy using [Normal Map Online](https://cpetry.github.io/NormalMap-Online/)**

#### Here are examples of both types:  
  
> *Weapon_Sword_166 - Gloom Sword - Nrm (Purple-ish)*

![Normal Maps: Purple-ish!](/Assets/GuideImages/custom-textures/Weapon_Sword_166_Nrm.png)  
  
> *Weapon_Sword_163 - Strong Zonaite Sword - Nrm (Golden)*

![Normal Maps: Golden!](/Assets/GuideImages/custom-textures/Weapon_Sword_163_Nrm.png)  
  
### Emission Maps:

> #### Known - Used For Glowing Textures

Emission Maps are used in any sort of glowing material. Some emission maps have special requirements, sometimes materials handle the emission color (namely the zonai weapons), while otherwise the color is handled by the textures themselves.

For making things emissive, see the [Materials (not done)]() guide.

### Here is an example of the two common emissive textures:

> *Enemy_LikeLike_Fire - Fire Like - Body_WeakPoint_Emc*  
  
![LikeLike: Texture Artifacts!](/Assets/GuideImages/custom-textures/Enemy_LikeLike_Fire_Body_Weak_Emc.png)  

> *Item_Parasail - Twilight Fabric - Item_Parasail_Fabric_Emc.38*  
  
![Parasail: Twilight Fabric!](/Assets/GuideImages/custom-textures/Item_Parasail_Fabric_Emc.38.png)  

### There is also another thing to keep in mind, some emission is controlled by the [Albedo](#albedo) texture, as well as the Emc/Emm texture, (co-dependance)!:

> *Weapon_Sword_164 - Mighty Zonaite Sword - Blade_Alb*  
  
![Albedo: Related To Emm!](/Assets/GuideImages/custom-textures/Weapon_Sword_164_Blade_Alb.png)  

> *Weapon_Sword_164 - Mighty Zonaite Sword - Blade_Emm*  
  
![Emission: Related To Alb!](/Assets/GuideImages/custom-textures/Weapon_Sword_164_Blade_Emm.png)  

>In this special case, the albedo texture and emission texture are co-dependant! If you were to make the Albedo texture completely green, without changing the emission, nothing would change, and vice versa.  
  
## So for this case, if you wanted to change the pattern of emission, you would have to change both textures!
  
## If you wanted the entire mesh to glow, you would have to make the Albedo fully green, and the Emission completely white!
  
  
> (remember const_color and const_value1 control the emission color and emission strength in most materials:   
[(See Guide Here - (not finished))]())

### Gn(#):

Speculated to stand for **Graphic Number**, some in game textures have multiple of the same Gn# textures with the *higher number* being *higher quality.*

This kind of system allows game engines to load the most appropriate texture based on the player's distance from an object (level of detail), the hardware capabilities, or the graphics settings selected by the player. This ensures that the game can run efficiently on various systems while still providing the best possible visual experience.

    Gn0 could be the lowest detail version for very distant objects.

    Gn1 might provide detail for far/distant views.

    Gn2 could represent textures that are for medium to far views.

    Gn3 would be for medium to close views.

    Gn4 would be for close views.

    Gn5 would be for very close up views.

It's a common approach in game development to have such LOD (Level of Detail) systems to maintain performance while providing high-quality visuals where they are most needed. This ensures that the game's performance remains stable without compromising on the visual richness, especially in a vast, open-world game like TLOZ TOTK.

### em0:

> #### Unknown - Some Sort Of Emission Type

This is most likely similar to [Emission](#emission-maps)

### Now that you have a basic understanding of how the game handles textures, let's discuss creating them.

> For whichever type of texture you would like to make, you can search the type in the TexToGo folder of your romfs dump.  
>  
> If you would like to make an Nrm texture, you can search Nrm, and so on.
>
> You can copy, paste, and rename whichever textures into your mods TexToGo folder, and then you can continue throughout the guide.

## Texture Import Formats:

### Import Types

> Some textures require different format selection depending on their type.  
  
For example, if you want a high quality texture, you can use BC7_SRGB. While for lower quality, out of focus textures, you can use BC1 UNORM.

#### I will now provide a list of textures, and the reccomended import types to avoid issues:

> Alb (High Quality) - BC7_SRGB  
> Alb (Low Quality) - BC1_UNORM  
> Nrm (Purple-ish Image) - BC1_UNORM  
> Nrm (Yellow Image) - BC5_UNORM  
> Spm (B&W Image) - BC4_UNORM  
> Spm (Blue Image) - BC5_UNORM  
> Emc - BC7_SRGB  
> Emm - BC7_SRGB  
> Gn# - Unknown  
> em0 - Unknown  
  
## STB Alpha Option:

This is a very small yet crucial point in this guide, which is required for transparent textures to work.  
  
When importing a texture, PLEASE check the alpha option:  
  
> Toolbox: Alpha Import Setting
  
![Toolbox: Don't forget this!](/Assets/GuideImages/custom-textures/Screenshot_695.png)  

## RESTBL Tool Usage:
See the restbl tool guide here: [RESTBL-GUIDE](/Guides/restbl-guide.md)