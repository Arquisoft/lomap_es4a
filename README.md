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
To add or switch between maps, first press the menu on the upper left-hand corner of your screen.

Then press “MapList”.

Finally, you will be presented with tree options.

You create a new map by writing a new map’s name in the create a new map option and press “create new map” to create the new map.

You load a different map by selecting one of your maps or one of your friend’s maps and pressing “load map” to switch to that map.

You can delete one of your maps by selecting one of your maps and pressing “delete map” to delete it.

## How to add a new place
To add a new place, click in the map, where you want the point to be located.

You will see a menu to set the place’s name, description, and category. Keep in mind that name and category are required.

Finally, press “add point” to save the point to the current map.

## How to add images and reviews to a place
To add images and reviews, you need to press the point you want.

You will see a menu to upload images and another one to add reviews.

## How to edit a place
To edit a place, first press the menu on the upper left-hand corner of your screen.

Then press “Points”.

The menu you will see has two parts, the first one is to filter the places, by categories. The second one is to change their visibility.

In the second menu you will see an icon in the shape of a pencil to edit each point. Press it.

You will see a menu to edit the point’s information. Keep in mind that name and category are still required.

Finally, press “save place” to save the edited place to the current map.

## How to hide, show and filter places
To hide, show and filter places, first press the menu on the upper left-hand corner of your screen.

Then press “Points”.

The menu you will see has two parts, the first one is to filter the places, by categories. The second one is to change their visibility.

To filter the places, select or deselect the boxes of the categories you want to see or hide and press “Filter”. Additionally, you can press “mark all” or “unmark all” to select all categories or unmark all categories.

To hide and show the places, press the switches of each point to change their visibility. Additionally, you can show or hide all places by pressing “Show / Hide all”.

## How to add and delete a friend
To add and delete friends, first press the menu on the upper left-hand corner of your screen.

Then press “MyFriends”.

Then you will see your current friends and a button to add friends.

For each friend you can delete it or see their pod.
