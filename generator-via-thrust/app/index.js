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
            this.pages = props.pages.split(',');
            this.responsive = props.responsive;
            this.structuresStrings = props.structures.replace(/ /g,'').split(',');
            this.structures = [];
            for(var i = 0; i < this.structuresStrings.length; i++){
                this.structures.push(this.structuresStrings[i].split('|')); 
            }

   
            done();
        }.bind(this));

    },

    // parseVaribles: function(){
    //     var pages = this.pages.split(',');
    //     var structures = this.structures.split(',');
    // },

    scaffoldFolders: function(){
        for (var i = 0; i < this.pages.length; i++) {
            var pageName = this._.slugify(this.pages[i]);
            this.mkdir('assets/scss/partials/'+pageName);
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

        this.template('_index.html', 'index.html');
        this.template('_bower.json', 'bower.json');
        this.template('assets/scss/config/_settings.scss', 'assets/scss/config/_settings.scss');
        for (var i = 0; i < this.pages.length; i++) {
            var pageName = this._.slugify(this.pages[i]);
            var context = {
                pageName: pageName
            };
            this.template('_partial.scss', 'assets/scss/partials/'+pageName+'/_'+pageName+'.scss', context);
            this.template('_partial-init.scss', 'assets/scss/partials/'+pageName+'/_init.scss', context);
        }
        this.template('_partials-init.scss', 'assets/scss/partials/_init.scss');
    },

    // installDependencies: function(){
    //     this.spawnCommand('bower', ['install']);
    // }
});

module.exports = ViaThrustGenerator;
