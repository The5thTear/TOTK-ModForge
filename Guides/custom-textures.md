# Ultimate TOTK Modding Guide - Custom Textures

Greetings modders! Whether you're new or familiar with textures, this comprehensive guide is your key to unlocking the world of custom textures in TOTK and beyond.

### 1. Table Of Contents:

> #### 1.1: [Creating Custom Textures](#11-creating-custom-textures-1)

> #### 1.2: [Custom Texture Formats](#12-custom-texture-formats)

> #### 1.3: [Toolbox Alpha](#13-toolbox-alpha)

> #### 1.4: [ResourceSizeTable Tool](#14-resourcesizetable-tool)
  
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

Albedo textures are used for all forms of color in the game. Albedo textures are basic, but the quality can differ depending on your textures  
  
[Section 2 - Texture Import Formats](#texture-import-formats)

### Specular Maps:

> #### Known - Used For Reflectiveness

Specular textures are used 

### Normal Maps:

> #### Known - Used For Detail/Reflectiveness Direction

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

> #### Unknown - Sometimes Emission, Sometimes Animation (Zonai Effects, etc.) # represents a number (3, 4, etc..)

***If you would like to do your own research here, some models that use gn(#) textures include:***

> Weapon_Sword_070
> (more to be added later)

### em0:

> #### Unknown - Some Sort Of Emission Type

This is most likely similar to [Emission](#emission-maps)

#### Now that you have a basic understanding of how the game handles textures, let's discuss creating them.

For whichever type of texture you would like to make, you can search the type in the TexToGo folder of your romfs dump.  
  
If you would like to make an Nrm texture, you can search Nrm, and so on.

You can copy, paste, and rename whichever textures into your mods TexToGo folder, and then you can continue throughout the guide.

## Texture Import Formats:

### Import Types

> Some textures require different format selection depending on their type.  
  
For example, if you want a high quality texture, you can use BC7_SRGB. While for lower quality, out of focus textures, you can use BC1 UNORM.

#### I will now provide a list of textures, and the reccomended import types to avoid issues:

> Alb (High Quality) - BC7_SRGB
> Alb (Low Quality) - BC1_UNORM
> Nrm (Purple-ish Image) - 
> Nrm (Yellow Image) - 
> Spm (B&W Image) - 
> Spm (Blue Image) - 
> Emc - BC7_SRGB
> Emm - BC7_SRGB
> Gn# - Unknown
> em0 - Unknown

## STB Alpha Option:

## RESTBL Tool Usage:
See the restbl tool guide here: [RESTBL-GUIDE]()