import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default class App extends Component{

  constructor(){
    super();

    this.state = {
      text: '',
      result: ''
    };
  }

  onPress = text => {
    newText = this.state.text;
    if(text == 'C'){
      newText = newText.slice(0, newText.length-1)
      let temp = newText[newText.length-1];
        if(temp == '+' || temp == '-' || temp == '*' || temp == '/' || temp == '.'){
          newText = newText.slice(0, newText.length-1)
          this.calculateResult(newText);
        }else{
          this.calculateResult(newText);
        }
      this.setState({text: newText});
    }else if(text == '.'){
      if(newText.length>0){
        let addSplit = newText.split('+');
        let subSplit = newText.split('-');
        let mulSplit = newText.split('*');
        let divSplit = newText.split('/');
        addSplit.map(item => {
          if(!item.includes('.') && newText[newText.length-1] != '.'){
            newText += text;
            this.setState({text: newText}); 
          }
        })
        subSplit.map(item => {
          if(!item.includes('.') && newText[newText.length-1] != '.'){
            newText += text;
            this.setState({text: newText}); 
          }
        })
        mulSplit.map(item => {
          if(!item.includes('.') && newText[newText.length-1] != '.'){
            newText += text;
            this.setState({text: newText}); 
          }
        })
        divSplit.map(item => {
          if(!item.includes('.') && newText[newText.length-1] != '.'){
            newText += text;
            this.setState({text: newText}); 
          }
        })
      }
    }else if(text == '+' || text == '-' || text == '*' || text == '/'){
      if(newText.length>0){
        let temp = newText[newText.length-1];
        if(temp == '+' || temp == '-' || temp == '*' || temp == '/'){
          newText = newText.slice(0, newText.length-1);
        }
        newText += text;
        this.setState({text: newText});
      }
    }else if (text == '='){
      this.calculateResult(newText);
    }else{
      newText = this.state.text;
      newText += text;
      this.setState({text: newText});
      this.calculateResult(newText);
    }
  }

  onLongPress = text => {
    if(text == 'C'){
      this.setState({
        text: '',
        result: ''
      })
    }
  }

  calculateResult = text => {
    const string = text || this.state.text;
    this.setState({result: eval(string)});
  }

  render() {
  const rows = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    ['.', 0, '=']
  ];
  const operations = [
    'C', '+', '-', '*', '/'
  ]
  const {text, result} = this.state;
    return (
      <View style = {styles.main}>
        <View style = {styles.calculator}>
          <Text style = {styles.calText}>{text}</Text>
        </View>
        <View style = {styles.result}>
          <Text style = {styles.resText}>{result}</Text>
        </View>
        <View style =  {styles.buttons}>
          <View style = {styles.numbers}>
            {
              rows.map((row, rowIndex) =>
                (<View style = {styles.numberRow} key = {rowIndex}>
                  {
                    row.map((item, itemIndex) =>
                      (
                        <TouchableOpacity 
                          key = {rows[rowIndex][itemIndex]} 
                          style = {styles.number} 
                          onPress = {() => this.onPress(rows[rowIndex][itemIndex])} 
                        >
                            <Text style = {styles.buttonText}>{rows[rowIndex][itemIndex]}</Text>
                        </TouchableOpacity>
                      )
                    )
                  }
                </View>)
              )
            }

          </View>
          <View style = {styles.operations}>
            {
              operations.map((item, index) =>
                (
                  <TouchableOpacity 
                    key = {index} 
                    style = {styles.operation} 
                    onPress = {() => this.onPress(item)}
                    onLongPress = {() => this.onLongPress(item)} 
                  >
                    <Text style = {styles.buttonText}>{item}</Text>
                  </TouchableOpacity>
                )
              )
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex: 1
  },
  calculator: {
    flex: 2,
    fontSize: 64,
    justifyContent: 'center'
  },
  result: {
    flex: 1,
    justifyContent: 'center',
  },
  calText:{
    textAlign: 'right',
    fontSize: 64,
    marginRight: 10,
    fontWeight: '100',
  },
  resText:{
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 32,
    marginRight: 10,
    color: 'black'
  },
  buttons: {
    flex: 4,
    backgroundColor: 'green',
    color: 'white',
    fontSize: 10,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    flexDirection: 'column'
  },
  numberRow: {
    flex: 1,
    flexDirection: 'row'
  },
  number: {
    flex: 1,
    justifyContent: 'center'
  },
  operations: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'column'
  },
  operation: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 26
  }
});
