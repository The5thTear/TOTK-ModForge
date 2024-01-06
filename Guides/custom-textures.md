# Ultimate TOTK Modding Guide - Custom Textures

Greetings modders! Whether you're new or familiar with textures, this comprehensive guide is your key to unlocking the world of custom textures in TOTK and beyond.

### 1. Table Of Contents:

> #### 1.1: Creating Custom Textures

> #### 1.2: Custom Texture Formats

> #### 1.3: BC4 Alpha

> #### 1.4: ResourceSizeTable Tool
  
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

In this special case, the albedo texture and emission texture are co-dependant! If you were to make the Albedo texture completely green, without changing the emission, nothing would change, and vice versa.  
  
So for this case, if you wanted to change the pattern of emission, you would have to change both textures!
  
If you wanted the entire mesh to glow, you would have to make the Albedo fully green, and the Emission completely white!
  
(remember const_color and const_value1 control the emission color and emission strength in most materials)

### Gn*:

Unknown - Sometimes Emission, Sometimes Animation (Zonai Effects, etc.) * represents a number (3, 4, etc..)

### em0:

Unknown - Some Sort Of Emission Type

Now that you have a basic understanding of how the game handles textures, let's discuss creating them.

## Texture Import Formats