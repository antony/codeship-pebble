var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var API_KEY = 'your-api-key';
var main;

ajax({url: 'https://codeship.com/api/v1/projects.json?api_key='+API_KEY, type: 'json'},
  function(json) {
    
    var builds = [];
    
    for (var idx in json.projects) {
      builds.push({
        title: json.projects[idx].repository_name.split('/')[1],
        subtitle: json.projects[idx].builds[0].status
      });
    }
    
    main = new UI.Menu({
      sections: [{
        title: 'Builds',
        items: builds
      }]
    });
    
    main.show();
    
    main.on('select', function(event) {

      var detailCard = new UI.Card({
        title: event.item.title,
        subtitle: moment(json.projects[event.itemIndex].builds[0].started_at).fromNow(),
        body: json.projects[event.itemIndex].builds[0].message
      });

      detailCard.show();
      
    });
    
  },
  function(error) {
    console.log('Ajax failed: ' + error);
  }
);

// main.on('click', 'up', function(e) {
//   var menu = new UI.Menu({
//     sections: [{
//       items: [{
//         title: 'Pebble.js',
//         icon: 'images/menu_icon.png',
//         subtitle: 'Can do Menus'
//       }, {
//         title: 'Second Item',
//         subtitle: 'Subtitle Text'
//       }]
//     }]
//   });
//   menu.on('select', function(e) {
//     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
//     console.log('The item is titled "' + e.item.title + '"');
//   });
//   menu.show();
// });

// main.on('click', 'select', function(e) {
//   var wind = new UI.Window({
//     fullscreen: true,
//   });
//   var textfield = new UI.Text({
//     position: new Vector2(0, 65),
//     size: new Vector2(144, 30),
//     font: 'gothic-24-bold',
//     text: 'Text Anywhere!',
//     textAlign: 'center'
//   });
//   wind.add(textfield);
//   wind.show();
// });

// main.on('click', 'down', function(e) {
//   var card = new UI.Card();
//   card.title('A Card');
//   card.subtitle('Is a Window');
//   card.body('The simplest window type in Pebble.js.');
//   card.show();
// });