/** @jsx React.DOM */
;(function (window, React, $, undefined) {

  var $main = document.querySelector('.main');

  var Shop = React.createClass({displayName: 'Shop',
    getData: function () {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function (data) {
          this.setState({data: data});
        }.bind(this),
        error: function (err) {
          console.error(err);
        }.bind(this)
      });
    },

    componentDidMount: function () {
      this.getData();
    },

    getInitialState: function () {
      return {
        data: [],
        filter: '',
        inStockOnly: false
      };
    },

    filterData: function (e) {
      this.setState({filter: e.target.value});
    },

    inStockFilter: function (e) {
      this.setState({inStockOnly: e.target.checked});
    },

    render: function () {
      return (
        React.DOM.div({className: "box"}, 
          Search({filter: this.filterData, value: this.state.filter, inStockOnly: this.state.inStockOnly, inStockChange: this.inStockFilter}), 
          List({products: this.state.data, value: this.state.filter, inStockOnly: this.state.inStockOnly})
        )
      );
    }
  });

  var Search = React.createClass({displayName: 'Search',
    render: function() {
      return (
        React.DOM.div({className: "box__search"}, 
          React.DOM.label({className: "box__label"}, 
            React.DOM.h4(null, "Поиск"), 
            React.DOM.input({onChange: this.props.filter, ref: "filterTextInput", className: "input", placeholder: "Поиск...", value: this.props.value})
          ), 
          React.DOM.label({className: "box__label"}, 
            React.DOM.input({onChange: this.props.inStockChange, type: "checkbox", className: "checkbox", ref: "inStockOnly", value: this.props.inStockOnly}), 
            React.DOM.span({className: "box__label-title"}, "В наличии")
          )
        )
      );
    }
  });

  var List = React.createClass({displayName: 'List',
    render: function () {

      var items = this.props.products.map(function (elem) {
          
            if ((this.props.value && elem.name.indexOf(this.props.value) !== -1) && this.props.inStockOnly === false || 
                ((this.props.value && elem.name.indexOf(this.props.value) !== -1) && (this.props.inStockOnly === elem.stocked && elem.stocked === true)) || 
                (!this.props.value.length && this.props.inStockOnly === elem.stocked && elem.stocked === true) ||
                (!this.props.value.length && this.props.inStockOnly === false)) {
              return (Item({name: elem.name, price: elem.price, stocked: elem.stocked}));
            }
          
          }.bind(this));

      return (
        React.DOM.div({className: "box__list"}, 
          items
        )
      );
    }
  });

  var Item = React.createClass({displayName: 'Item',
    render: function () {
      var stocked = (this.props.stocked) ? 'box__item' : 'box__item box__item_stocked'; 
      return (
        React.DOM.div({className: stocked}, 
          this.props.name, " - ", this.props.price
        )
      );
    }
  });

  React.renderComponent(Shop({url: "catalog.json"}), $main);

}(window, window.React, window.jQuery));