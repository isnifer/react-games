/** @jsx React.DOM */
;(function (window, React, $, undefined) {

  var $main = document.querySelector('.main'); 

  var ListBox = React.createClass({displayName: 'ListBox',

    getInitialState: function () {
      return {data: []};
    },

    loadData: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    render: function() {
      return (
        React.DOM.div({className: "listbox"}, 
          ListPeople({data: this.state.data}), 
          React.DOM.button({onClick: this.loadData}, "Подгрузить данные")
        )
      );
    }

  });

  var ListPeople = React.createClass({displayName: 'ListPeople',
    render: function () {
      var people = this.props.data.map(function (man) {
        return (
          ListItem({name: man.title, age: man.value})
        );
      });

      return (
        React.DOM.div({className: "listbox__list"}, 
          people
        )
      );
    }
  });

  var ListItem = React.createClass({displayName: 'ListItem',

    render: function () {
      return (
        React.DOM.div({className: "listbox__item"}, 
          this.props.name, ": ", this.props.age
        )
      );
    }

  });

  React.renderComponent(ListBox({url: "data.json"}), $main);

}(window, window.React, window.jQuery));