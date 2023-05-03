# LoMap Es4A

[![CI for LOMAP ES4A](https://github.com/Arquisoft/lomap_es4a/actions/workflows/lomap_es4a.yml/badge.svg)](https://github.com/Arquisoft/lomap_es4a/actions/workflows/lomap_es4a.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es4a&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es4a)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es4a&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es4a)

<p float="left">
<img src="./docs/images/lomapLogo.png">
</p>

# Welcome to LoMap!

- LoMap is a software solution that allows you to create a map, fill it with places and share it with your friends.

- LoMap provides an easy-to-use web application interface that allows you to choose between different maps, add and edit places, save images and reviews, filter points and much more.

- LoMap cares about your privacy, so we don’t store ANY of your data. By using the SOLID principles, the data you create will be stored in your own SOLID POD.

# User Guide

LoMap uses a SOLID POD, which is a space that contains your data. From your POD you can decide who has access to your data and revoke access whenever you want to.
To use a SOLID POD, you first need to create an account with a SOLID POD. To create an account, please follow these steps [get-a-pod](https://solidproject.org/users/get-a-pod). The supported providers are [inrupt.net](https://inrupt.net/), [solidcommunity.net](https://solidcommunity.net/) and [solidweb.org](https://solidweb.org/). Please, keep in mind that supporting more providers is still a work in progress!

After creating an account with a POD provider, you can already use LoMap! To use LoMap, access [LoMap](https://gonzalo-rr.github.io/lomap_es4a/) and log in using your SOLID POD provider account. When you log in for the first time we will create a default map, you can change it or create new maps. Then, you can start to add new places.

## How to add, delete and switch between maps
To add or switch between maps, first press the menu on the upper right-hand corner of your screen.
![image](https://user-images.githubusercontent.com/98962656/236052651-5e306d77-89a6-4b98-ae19-34440f4498a7.png)

Then press “MapList”.
![image](https://user-images.githubusercontent.com/98962656/236052937-84c9d947-5423-4d00-85ea-068237b43202.png)

Finally, you will be presented with tree options.

You create a new map by writing a new map’s name in the create a new map option and press “create new map” to create the new map. (1)

You load a different map by selecting one of your maps or one of your friend’s maps and pressing “load map” to switch to that map. (2)

You can delete one of your maps by selecting one of your maps and pressing “delete map” to delete it. (3)
![image](https://user-images.githubusercontent.com/98962656/236053404-3d5b6700-506c-49fc-99e6-a75983811c0b.png)

## How to add a new place
To add a new place, click in the map, where you want the point to be located.

You will see a menu to set the place’s name, description, and category. Keep in mind that name and category are required.

Finally, press “add point” to save the point to the current map.
![image](https://user-images.githubusercontent.com/98962656/236054244-51755ad3-87e4-47b0-90b7-b3e97fc0a7c7.png)

## How to add images and reviews to a place
To add images and reviews, you need to clic the point you want.

You will see a menu to upload images and another one to add reviews.
![image](https://user-images.githubusercontent.com/98962656/236055331-be4fd377-1f72-40cc-b7fe-b964bfe0052f.png)
![image](https://user-images.githubusercontent.com/98962656/236055740-ad921f50-7015-45f6-a8c1-edc191937c61.png)

If you clic on the image you can see it bigger! (clic away to close)
![image](https://user-images.githubusercontent.com/98962656/236055864-53c0e28f-4016-4343-8b5d-649dbc43e3bf.png)

## How to edit a place
To edit a place, first press the menu on the upper right-hand corner of your screen.
![image](https://user-images.githubusercontent.com/98962656/236052651-5e306d77-89a6-4b98-ae19-34440f4498a7.png)

Then press “Points”.
![image](https://user-images.githubusercontent.com/98962656/236056077-f3051942-9e0f-4787-a814-8a9d85f9ff64.png)

The menu you will see has two parts, the first one is to filter the places, by categories (for now). The second one is to change their visibility.
![image](https://user-images.githubusercontent.com/98962656/236056353-ed798542-3863-44ef-af16-594b94574c0e.png)

In the second menu you will see an icon in the shape of a pencil to edit each point. Press it.
![image](https://user-images.githubusercontent.com/98962656/236056629-576962ac-35c3-46cc-80e6-7816667df856.png)

You will see a menu to edit the point’s information. Keep in mind that name and category are still required.

Finally, press “save place” to save the edited place to the current map.
![image](https://user-images.githubusercontent.com/98962656/236056845-665d81b0-7dfb-41a7-ae98-fac0fd9229e2.png)

## How to hide, show and filter places
To hide, show and filter places, first press the menu on the upper right-hand corner of your screen.
![image](https://user-images.githubusercontent.com/98962656/236052651-5e306d77-89a6-4b98-ae19-34440f4498a7.png)

Then press “Points”.
![image](https://user-images.githubusercontent.com/98962656/236056077-f3051942-9e0f-4787-a814-8a9d85f9ff64.png)

The menu you will see has two parts, the first one is to filter the places, by categories. The second one is to change their visibility.

To filter the places, select or deselect the boxes of the categories you want to see or hide and press “Filter”. Additionally, you can press “mark all” or “unmark all” to select all categories or unmark all categories.
![image](https://user-images.githubusercontent.com/98962656/236057917-4593a67f-be6c-4c68-ab8a-860b13a60368.png)

To hide and show the places, press the switches of each point to change their visibility. Additionally, you can show or hide all places by pressing “Show / Hide all”.
![image](https://user-images.githubusercontent.com/98962656/236058438-9a1c7e13-8b79-46c4-b17c-4ead97380e2f.png)

## How to add and delete a friend
To add and delete friends, first press the menu on the upper right-hand corner of your screen.
![image](https://user-images.githubusercontent.com/98962656/236052651-5e306d77-89a6-4b98-ae19-34440f4498a7.png)

Then press “MyFriends”.
![image](https://user-images.githubusercontent.com/98962656/236058635-9ef53495-1f9c-44cd-883f-3bb64a04d571.png)

Then you will see your current friends and a button to add friends.
![image](https://user-images.githubusercontent.com/98962656/236058747-d7f948e3-ff71-4538-9e8c-e56e09b724ae.png)

For each friend you can delete it or see their pod.
![image](https://user-images.githubusercontent.com/98962656/236058832-d8a0da27-e22d-47f3-bef8-edddc1b3a697.png)
