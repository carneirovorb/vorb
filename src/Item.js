import React, {Component} from 'react';
import {Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import styles from '../styles';




export default class Item extends Component{



  constructor(props){
    super(props)
    this.state={
      status:styles.uncheck,
      color:'#555',
 
    
    };
 
    this.toogleCategory = this.toogleCategory.bind(this)

   

  }
  toogleCategory(){

    
    
    let state = this.state;
      if(state.status == styles.uncheck){
          state.status = styles.check;
          state.color = '#FFF';
          this.props.addTag(this.props.data.tags);

      }else{
        state.status = styles.uncheck;
        state.color =  '#555';
        this.props.removeTag(this.props.data.tags);
    }

      this.setState(state);
    
  };


    render(){
        return(
          
            <TouchableOpacity 
               style={[styles.categories, this.state.status ]} 
               onPress={this.toogleCategory} 
               onLongPress={()=>{this.props.deleteTag(this.props.data._id)}}>
              <Text style={[styles.categoriesText, {color: this.state.color}]}>{this.props.data.tags}</Text>
            </TouchableOpacity>      
          );
    }


}




