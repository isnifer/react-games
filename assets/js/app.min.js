/** @jsx React.DOM */
;(function (window, React, $, undefined) {

  var $main = document.querySelector('.main'); 

  var ListBox = React.createClass({

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

    componentDidMount: function () {
      this.loadData();
    },

    render: function() {
      return (
        <div className="listbox">
          <ListPeople data={this.state.data} />
          <button onClick={this.loadData}>Подгрузить данные</button>
        </div>
      );
    }

  });

  var ListPeople = React.createClass({
    render: function () {
      var people = this.props.data.map(function (man) {
        return (
          <ListItem name={man.name} age={man.age} />
        );
      });

      return (
        <div className="listbox__list">
          {people}
        </div>
      );
    }
  });

  var ListItem = React.createClass({

    render: function () {
      return (
        <div className="listbox__item">
          {this.props.name}: {this.props.age}
        </div>
      );
    }

  });

  React.renderComponent(<ListBox url="data.json" />, $main);

}(window, window.React, window.jQuery));