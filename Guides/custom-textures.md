# Ultimate TOTK Modding Guide - Custom Textures

Greetings modders! Whether you're new or familiar with textures, this comprehensive guide is your key to unlocking the world of custom textures in TOTK and beyond.

### 1. Table Of Contents:

#### 1.1: Creating Custom Textures

#### 1.2: Custom Texture Formats

#### 1.3: BC4 Alpha

#### 1.4: ResourceSizeTable Tool

Alright, let's get started.

## 1.1: Creating Custom Textures:

Creating custom textures is incredibly simple, and I'm here to teach you!

There are multiple texture types, including Albedo, Specular Maps(Spm), Normal Maps (Nrm), Emission Maps (Emc/Emm), as well as Gn*, and em0.

Here are the use cases and logistics of each type:

#### Albedo:

Known - Used For Textures Color

Albedo textures are used for all forms of color in the game. Albedo textures are basic, but the quality can differ depending on your textures 2. [Section 2 - Texture Import Formats](#texture-import-formats)

#### Specular Maps:

#### Normal Maps:

#### Emission Maps:

Known - Used For Glowing Textures

Emission Maps are used in any sort of glowing material. Some emission maps have special requirements, sometimes materials handle the emission color (namely the zonai weapons), while otherwise the color is handled by the textures themselves.

There is also another thing to keep in mind, some emission is controlled by the [Albedo](#albedo) texture, as well as the Emc/Emm texture.

For making things emissive, see the [Materials (not done)]() guide.

Here is an example of the two common emissive textures:

Weapon_Sword_164 - Mighty Zonaite Sword - 

(remember const_color and const_value1 control the emission color and emission strength in most materials)

#### Gn*:

Unknown - Sometimes Emission, Sometimes Animation (Zonai Effects, etc.) * represents a number (3, 4, etc..)

#### em0:

Unknown - Some Sort Of Emission Type

Now that you have a basic understanding of how the game handles textures, let's discuss creating them.

## Texture Import Formats