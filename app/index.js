'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var ViaThrustGenerator = yeoman.generators.Base.extend({

    questions: function() {
        var done = this.async();
 
        //Greet the user
        this.log(yosay('Welcome to the fabulous Via Creative Thrust generator' ));

        //Ask the things
        var prompts = [{
            name: 'siteName',
            message: 'What is the name of the site?'
        },{
            name: 'pages',
            message: 'What are the names of the pages? (Comma seperated)'
        },{
            type: 'confirm',
            name: 'responsive',
            message: 'Is the site responsive?'
        },{
            name: 'structures',
            message: 'What page structures would you like to use? (Special syntax)'
        }];


        //Pass the answers to the prompt method
        this.prompt(prompts, function (props) {
            this.siteName = props.siteName;
            this.responsive = props.responsive;

            this.pageStrings = props.pages.replace(/, /g,',').split(',');
            this.pages = {};

            //Populate the pages object with friendly and slug versions of each page name
            for(var i=0; i<this.pageStrings.length; i++){
                this.pages['page_'+i] = [this.pageStrings[i].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}), this._.slugify(this.pageStrings[i])];
            }

            //Convert structures syntax to lower case
            props.structures = props.structures.toLowerCase();
            //Remove spaces and split it by the commas into an array
            this.structuresStrings = props.structures.replace(/ /g,'').split(',');
            this.structuresArray = [];
            this.structures = {};
            //Loop through the split structures
            for(var i = 0; i < this.structuresStrings.length; i++){
                //Add each argument in the special syntax (split by |) to the structures array
                this.structuresArray.push(this.structuresStrings[i].split('|')); 

                //If it doesn't already exist, create an entry in the structures object with the page name as the key
                if(!(this.structuresArray[i][0] in this.structures)){
                    this.structures[this.structuresArray[i][0]] = {};
                }
                //Add each section of page to the right page in the object, with the name as the key and the structure as the value e.g:
                //home: {slider: 'zeus'}
                this.structures[this.structuresArray[i][0]][this.structuresArray[i][1]] = this.structuresArray[i][2];
            }
   
            done();
        }.bind(this));
    

    },

    availableStructures: function(){
        this.availableStructures = {
            zeus: ['article'],
            poseidon_left: ['aside', 'article'],
            poseidon_right: ['article', 'aside'],
            poseidon: ['article', 'article'],
            hermes_left: ['aside', 'figure', 'figure'],
            hermes_right: ['figure', 'figure', 'aside'],
            hermes: ['figure', 'figure', 'figure'],
            athena: ['figure', 'figure', 'figure', 'figure'],
        }
    },

    scaffoldFolders: function(){
        for (var i = 0; i < Object.keys(this.pages).length; i++) {
            this.mkdir('assets/scss/partials/'+this.pages['page_'+i][1]);
        }
        this.mkdir('assets/scss/config');
        this.directory('assets/scss/partials/global');
        this.directory('assets/scss/functions');
        this.directory('assets/scss/mixins');
        this.directory('assets/scss/modules');
        this.directory('assets/scss/structure');
        this.directory('assets/scss/style');
        this.directory('assets/scss/vendor');
        this.mkdir('assets/js');
        this.mkdir('assets/img');
    },

    copyMainFiles: function(){
        this.copy('assets/js/_main.js', 'assets/js/main.js');
        this.copy('assets/js/_plugins.js', 'assets/js/plugins.js');
        this.copy('assets/scss/_style.scss', 'assets/scss/style.scss');
        this.copy('_bowerrc', '.bowerrc');
        this.copy('assets/scss/config/_box-sizing.scss', 'assets/scss/config/_box-sizing.scss');
        this.copy('_apple-touch-icon-precomposed.png', 'apple-touch-icon-precomposed.png');
        this.copy('_crossdomain.xml', 'crossdomain.xml');
        this.copy('_favicon.ico', 'favicon.ico');
        this.copy('_favicon.png', 'favicon.png');
        this.copy('_humans.txt', 'humans.txt');
        this.copy('_LICENSE.md', 'LICENSE.md');
        this.copy('_README.md', 'README.md');
        this.copy('_robots.txt', 'robots.txt');

        this.template('_index.html', 'index.html');
        this.template('_bower.json', 'bower.json');
        this.template('assets/scss/config/_settings.scss', 'assets/scss/config/_settings.scss');
        for (var i = 0; i < Object.keys(this.pages).length; i++) {
            var pageName = this.pages['page_'+i][1];
            var context = {
                pageName: pageName,
                structures: this.structures,
            };
            this.template('_partial.scss', 'assets/scss/partials/'+pageName+'/_'+pageName+'.scss', context);
            this.template('_partial-init.scss', 'assets/scss/partials/'+pageName+'/_init.scss', context);
        }
        this.template('_partials-init.scss', 'assets/scss/partials/_init.scss');
    },

    installDependencies: function(){
        this.spawnCommand('bower', ['install']);
        this.copy('assets/js/vendor/modernizr-2.7.1.min.js', 'assets/js/vendor/modernizr-2.7.1.min.js');
    },

});

module.exports = ViaThrustGenerator;
