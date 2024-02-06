# Ultimate TOTK Modding Guide - Model Swapping + Materials

Greetings modders! Whether you're a seasoned enthusiast or a novice explorer, this comprehensive guide is your key to unlocking the world of model swapping in TOTK and beyond.

#### 1.3 Overview of Modding in TOTK
Get a lay of the land with an introductory overview, setting the stage for your modding escapades.

### 2. Prerequisites
For this guide, you will need a basic understanding of the [ResourceSizeTable](/Guides/restbl-guide.md), as well as a basic understanding of [Blender](https://www.blender.org/).

#### 2.1 Required Software
Equip yourself with the essential tools, including NX Editor, Switch Toolbox, and image editing software. Ensure you have a full TOTK game dump and a basic grasp of RESTBL and Blender.

#### 2.2 Game Dump and File Structure
Navigate the intricacies of TOTK's file structure, laying the foundation for your modding playground.

#### 2.3 Basic Knowledge of RESTBL and Blender
Master the basics of RESTBL and Blender, your trusty companions in the world of TOTK modding.

### 3. Model Preparation
Before attempting to implement your model in game, we will need to prepare, and curate your model to ensure 100% compatability.

#### 3.1 Obtaining or Creating Models and Textures
Choose your arsenal: either extract models from BOTW, source them from free model repositories, or craft your own masterpieces.

#### 3.2 Choosing Between Model Swapping and Adding New Models
Dive into the decision-making process: swap existing models or introduce entirely new creations? The choice is yours.

#### 3.3 Understanding ModelInfo in the Actor's Pack File
Uncover the secrets of ModelInfo within the Actor's Pack File, a crucial aspect of successful model integration.


## Purpose:

I've decided to make this guide, to ensure nobody else has to experience the struggles I experienced during my learning curve. When I first started, I followed the model swapping guide called ["Model Swapping (Quick N' Dirty)"](https://gamebanana.com/tuts/16170).
  
This guide was useful, of course. However, it lacked many key details, pointers, and it was quite vague.
  
The screenshots, and other images provided in said guide were terrible, zoomed out, blurry, or just plain misleading.

Phrases such as "Rig your model and attach it to the armature." are informative, but they lack any followup which can cause confusion for newcomers.

I've spent hundreds of hours, modelling, importing, and tweaking models, and I can say with 100% certainty you don't know everything about them *(and neither do I)*.

## Background:

My name is **The5thTear**, I have been modding TotK for *roughly* 7 months as of `(Feb, 5th, 2024)`.

I am a part of multiple large modding projects, such as the [TotK Master Mode Project](https://gamebanana.com/projects/36566), the [Tears of the Kingdom Mod Manager](https://gamebanana.com/wips/81203), [Sheikah Rennaisance](https://gamebanana.com/mods/465707), and more!

I like to call myself the "*Model Man*", and I hope I can pass on as much knowledge as possible down to you.

You can learn from my trials and triumphs, to expand your repitouire and become a modelling master!
  
Ladies and Gentleman, fasten your seatbelts, this is gonna be a long one :)
  
> This guide is split into two parts, since materials are a complex aspect in models, we might as well cover them both here.

# Materials:
  
## What are they?
Tears of the Kingdoms material system is incredibly versatile. With intricacies still unknown, comprehending them can be an incredibly taxing endeavor.
  
Luckily, I'm here to help!

In the context of TotK, a material is a word used to describe a piece of a model that stores texture, color, and shader information.

## So.. What's The Catch?
Unfortunately, there is a catch..

Materials are incredibly painful to deal with (until now).

Here are some images to help you understand where everything is located in our first requisite, [Switch Toolbox](https://github.com/KillzXGaming/Switch-Toolbox)!

![BasicLayout](/Guides/ModelSwapping/Assets/Screenshot_150.png)

Here, the purple circle is surrounding the model. The model's "wireframe" is being diplayed since we have the "Mt_Body" material selected. In Toolbox, when selecting a material, the affected verticies are displayed to help the user visualize what they're doing.
  
The pink bracket is highlighting the *`Materials`* tab of the model. Here you can find existing materials, or import them!
  
Finally, the blue brackets are highlighting textures. The bracket on the left highlights every texture that is currently available to Toolbox and/or what textures are currently being utilized by the model. While the right bracket highlights what textures the material you have selected is using.

![ShaderParameters](/Guides/ModelSwapping/Assets/Screenshot_151.png)

This screenshot highlights the *`Shader Parameters`* tab! Here you can find and adjust parameters.

> Keep in mind each material has its own parameters!

The white arrow is pointing to the parameter used for emmision strength *(`const_value_0` on emissive materials)*. While the green bracket is highlighting the shaders *`Const_Color`* parameters, which in some cases control emission color.

![ObjectRelations](/Guides/ModelSwapping/Assets/Screenshot_152.png)
  
In this final image we have 3 important areas. The first thing you should notice (shown by the green arrow) is that we have an **object** selected, *not a material.*

In this object view, we have some pieces of information *crucial* to finding the right material for the job, as well as assigning said material to the object.

The blue arrow points to the objects "*`Material Information`*", a small field which determines what material is assigned to an object. The material can be changed to anything currently imported into the model by selecting the dropdown and choosing the desired material.

The red arrow is pointing to one of the most confusing fields for beginners... Skin Counts

## Skin Counts : Welcome To Hell.
The term "Skin Count" is used to describe the amount of influence for a single vertex a bone has. The reason an issue is, Nintendo compiles shader code ONLY for what the certain mesh requires.
  
This is incredibly annoying, it can cause issues when trying to use a certain material on your model.

## Why Does It Matter?
When you use a *`Material`* with a *`Skin Count`* incompatible with an objects *`Mesh`*, the object can appear very deformed, or straight up invisible seen here:

![BrokenMesh](/Guides/ModelSwapping/Assets/Screenshot_.png)



# Models: