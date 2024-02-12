# Ultimate TOTK Modding Guide - Model Swapping + Materials

**Greetings modders!**   
  
Whether you're a seasoned enthusiast or a novice explorer, this comprehensive guide is your key to unlocking the world of model swapping in TOTK and *beyond*.

- [Ultimate TOTK Modding Guide - Model Swapping + Materials](#ultimate-totk-modding-guide---model-swapping--materials)
  - [Purpose:](#purpose)
  - [Background:](#background)
- [Materials:](#materials)
  - [What are they?](#what-are-they)
  - [So.. What's The Catch?](#so-whats-the-catch)
  - [Skin Counts : Welcome To Hell.](#skin-counts--welcome-to-hell)
  - [Why Does It Matter?](#why-does-it-matter)
  - [Material Types:](#material-types)
    - [Opaque:](#opaque)
    - [Translucent:](#translucent)
    - [Transparency Support:](#transparency-support)
  - [Material Oddities:](#material-oddities)
  - [Fuck around: Find out.](#fuck-around-find-out)
- [Models:](#models)
  - [Desired Results?](#desired-results)
    - [ModelInfo Swap:](#modelinfo-swap)
    - [Model Swap:](#model-swap)
    - [Custom Actor Model Swap:](#custom-actor-model-swap)

## Purpose:

I've decided to make this guide, to ensure nobody else has to experience the struggles I experienced during my learning curve. When I first started, I followed the model swapping guide called:

["Model Swapping (Quick N' Dirty)"](https://gamebanana.com/tuts/16170).
  
This guide was useful, of course. However, it lacked many key details, pointers, and it was {#ff0000}quite vague}.
  
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

Materials are incredibly painful to deal with, but hopefully this should make understanding them easier.

Here are some images to help you understand where everything is located in our first requisite, [Switch Toolbox](https://github.com/KillzXGaming/Switch-Toolbox)!

{size}50%{/size}
![BasicLayout](./Assets/Screenshot_150.png)

Here, the {#9900ff}purple circle} is surrounding the model. The model's "wireframe" is being diplayed since we have the "Mt_Body" material selected. In Toolbox, when selecting a material, the affected verticies are displayed to help the user visualize what they're doing.
  
The {#ff00ee}pink bracket} is highlighting the *`Materials`* tab of the model. Here you can find existing materials, or import them!
  
Finally, the {#00a2ff}blue brackets} are highlighting textures. The bracket on the left highlights every texture that is currently available to Toolbox and/or what textures are currently being utilized by the model. While the right bracket highlights what textures the material you have selected is using.

![ShaderParameters](./Assets/Screenshot_151.png)

This screenshot highlights the *`Shader Parameters`* tab! Here you can find and adjust parameters.

> Keep in mind each material has its own parameters!

The {#ffffff}white arrow} is pointing to the parameter used for emmision strength *(`const_value_0` on emissive materials)*. While the {#37ff29}green bracket} is highlighting the shaders *`Const_Color`* parameters, which in some cases control emission color.

![ObjectRelations](./Assets/Screenshot_152.png)
  
In this final image we have 3 important areas. The first thing you should notice {#37ff29}(shown by the green arrow)} is that we have an **object** selected, *not a material.*

In this object view, we have some pieces of information *crucial* to finding the right material for the job, as well as assigning said material to the object.

The {#2990ff}blue arrow} points to the objects "*`Material Information`*", a small field which determines what material is assigned to an object. The material can be changed to anything currently imported into the model by selecting the dropdown and choosing the desired material.

The {#ff0000}red arrow} is pointing to one of the most confusing fields for beginners... Skin Counts

## Skin Counts : Welcome To Hell.
The term "Skin Count" is used to describe the amount of influence for a single vertex a bone has. The reason an issue is, Nintendo compiles shader code ONLY for what the certain mesh requires.
  
This is incredibly annoying, it can cause issues when trying to use a certain material on your model.

## Why Does It Matter?
When you use a *`Material`* with a *`Skin Count`* incompatible with an objects *`Mesh`*, the object can appear very deformed, or straight up invisible seen here:

![BrokenMesh](./Assets/Screenshot_.png)

To mitigate this, we must find compatible *`Materials`*, that support your desired "*Texture Types*", with a compatible *`Skin Count`*.

*Luckily*, I have created a tool to simplify this process and make it much easier.

> It can be seen here: [Material Calculator - The5thTear](https://the5thtear.github.io/TOTK-ModForge/Information/MaterialCalculator/calculator.html)

## Material Types:
There are a *plethora* of *`Material Types`*, but they can be placed into 3 categories.

### Opaque:
The first category of *`Materials`* is a type that does **NOT** support transparency. Opaque materials are for anything that requires **FULL** coverage, without transparent parts in the texture.

The Icon in Toolbox looks like this:  
![OpaqueIcon](./Assets/Screenshot_154.png)

### Translucent:
The second *`Material`* category is a very rare one. This material type supports `Translucency`! This could be used for water, for something glowing, etc..

> Translucency is the term for something that is semi-transparent.

The Icon in *`Toolbox`* looks like this:  
![TranslucentIcon](./Assets/Screenshot_155.png)

### Transparency Support:
The third and final *`Material`* category is one that *supports* transparent "Masking". This means that some parts of the texture *can* be transparent, and some can be opaque. This can be used on clothing, and **more..**

The Icon in *`Toolbox`* looks like this:  
![TransparentIcon](./Assets/Screenshot_156.png)

## Material Oddities:
Some materials behave much differently than others do. For example, a simple material for displaying one color, VS the {#00ff73}Zonai String} material that Mineru uses are very different and function in different ways.

## Fuck around: Find out.
This is my favorite thing to say whenever somebody asks a modding question. If you don't know the answer to something, then test your theories until you figure it out!

> You have the keys to the castle, now let's open the door...

# Models:

## Desired Results?
> When modelling in **TotK**, there are 3 different ways to implement your work. 

### ModelInfo Swap:

The ModelInfo Swap is the most simple of 3 methods. A good example of said model swap would be the "**Phantom Ganon Glow Removal**" mod by [***Aster***]().

{size}50%{/size}
<!--image-sequence time="3"-->
![GlowRemovalMod](./Assets/655025926ef6d.jpg)
![GlowRemovalMod2](./Assets/655025926ada3.jpg)
<!--/image-sequence-->

> This mod is made with a simple ModelInfoRef edit!

In the .pack.zs file related to the Phantom Ganon enemy (as well as anything else that uses a model), located under `Component/ModelInfo`, there is a byml file containing data relavant to the model the Actor uses.

By changing the reference to the model from the "gloomified" Phantom Ganon, to the regular variant, the Actor uses the regular model instead, giving us our end result.

### Model Swap:

The Model Swap is the second most complex method. It involves exporting the model, replacing it, weighting the new model to the armature, exporting with the correct settings, setting up the correct materials, and more!

A good example of model swapping would be "**All Champions**" by [***ATK_SUPPA***](https://gamebanana.com/members/2175315).

### Custom Actor Model Swap:

A custom actor model swap involves **BOTH** the ModelInfoRef edit method, as well as the Model Swap method.

Now let's go into extreme detail for all of these methods. 