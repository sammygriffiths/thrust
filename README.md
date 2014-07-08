Thrust
=========

A really simple front-end web application bootstrap for the [Via] development team.

Originally cloned from HTML5 Boilerplate, we've restructured it to our liking and included a default SASS directory structure.

####New with v 1.0
Now thrust is using [yeoman] & [bower] so you can get up and running even faster.

Usage
-----
You'll have to have Node package manager installed to get thrust's dependencies, it comes with node js these days, so go to http://nodejs.org/ and install it.

If you don't already have yeoman & bower, simply run:
```
npm install -g yo
npm install -g bower
```

Now that's taken care of, simply clone thrust down and:
```
cd [thrust directory]
npm link

cd [your project directory]
yo thrust
```
Then just answer the questions and you're good to go.

Page Structure Syntax
----
Although the questions are reasonably straight forward, the page structures one requires the correct syntax, which is thus:
```
//comma separated list
page-name|section-name|structure-name

e.g
home|slider|zeus, news|intro|poseidon
```

Available Page Structures
---

Now you may have noticed we decided to name the page structures after greek gods, that's just how we roll at via.
Plus we thought all that 'two-col-sidebar-right' business was rather inelegant.

| Structure               | God Name          |
| ------------------------|-------------------|
| Full Width              | zeus              |
| Two Col                 | poseidon          |
| Two Col Sidebar Left    | poseidon_left     |
| Two Col Sidebar Right   | poseidon_right    |
| Three Col               | hermes		      |
| Three Col Sidebar Left  | hermes_left       |
| Three Col Sidebar Right | hermes_right      |
| Four Col                | athena            |

Version
----

1.0


[via]:http://www.viacreative.co.uk
[yeoman]:http://yeoman.io/
[bower]:http://bower.io/