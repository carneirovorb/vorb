import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, TouchableOpacity, View, Alert,FlatList, ToastAndroid } from 'react-native';
import styles from '../../styles';
import { debug } from 'util';
import moment from "moment";
import Item from '../Item'
import DateTimePicker from 'react-native-modal-datetime-picker';


Datastore = require('react-native-local-mongodb');
db = new Datastore({ filename: 'asyncStorageKey', autoload: true });


export default class InsertView extends Component {

   constructor(props) {
      super(props);
      this.state = {
         totalPrice:'',
         isVisible: false,

         data: [

         ],
         dataFiltered:[],
         thisMonth: '',
         tags: [],
         price: '',
         flagFlter:0

      };

      let today = moment(new Date()).format('LL').split(" ");
      this.state.thisMonth = today[2] + ' ' + today[3] + ' ' + today[4];

     
      const didBlurSubscription = this.props.navigation.addListener(
         'willFocus',
         payload => {
            let today = moment(new Date()).format('LL').split(" ");
            this.state.thisMonth = today[2] + ' ' + today[3] + ' ' + today[4];
            this.updateTags(new Date());
         }
      );

      
   }

   showPicker = () => { this.setState({ isVisible: true }) }
   hidePicker = () => { this.setState({ isVisible: false }) }
   handlePicker = (chosenDate) => {
      this.updateTags(chosenDate);
      let today = moment(chosenDate).format('LL').split(" ");
      today = today[2] + ' ' + today[3] + ' ' + today[4];
      this.setState({
         isVisible: false,
         thisMonth: today
      })
   }

      updateTags = (param) =>{
         let date = moment(param).format('ll').split(" ");
         let myRe = new RegExp(date[2]);
         let tags = [];
         let price = 0;

         set = (aux, out, price) => {
            this.setState({
               data: aux,
               dataFiltered:aux,
               tags: out,
               price: price,
               flagFlter:0,
               totalPrice:price
            });
         
         }
         db.find({ date: myRe }, function (err, docs) {
           

            let aux = []
            docs.forEach(element => {
               tags = tags.concat(element['tags']);
               aux.push(element);
               price += parseFloat(element['price']);
            });

            tags = [...new Set(tags)];
            let out = []
            tags.forEach(el => {
               out.push({ 'tags': el })
            });

            set(aux, out, price);

         });
      }


   removeItem(id){
      Alert.alert(
         'Deletar Gasto',
         'Deseja remover esse gasto?',
         [
           {
             text: 'Cancelar',
           },
           {text: 'Sim', onPress: () => {
            db.remove({ _id: id }, {}, function (err, numRemoved) {
               if(numRemoved==1){
                  ToastAndroid.show('Gasto deletada!', ToastAndroid.SHORT);  
               }
             });
             this.updateTags(new Date());
           }},
         ],
         {cancelable: false},
       );

      
   }

   
   flatRender(item) {
      // console.log(item.hashTags)
      date = item.date.split(" ");
      date = +date[0] + ' ' + date[1] + ' ' + date[2];

      return (
         <TouchableWithoutFeedback onLongPress={()=>{this.removeItem(item._id)}}>
            <View style={[styles.listViewItem, { flex: 1, flexDirection: 'row', justifyContent: 'space-between', }]}>
               <View style={{ justifyContent: 'space-around' }}>
                  <Text style={{ fontSize: 20, }}>{item.description}</Text>
                  <Text style={{ fontSize: 14, width: 150 }}>{item.tags}</Text>
               </View>
               <View style={{ justifyContent: 'space-around' }}>
                  <Text style={{ fontSize: 14, textAlign: "right" }}>{date}</Text>
                  <Text style={{ fontSize: 20, textAlign: "right" }}>{'R$ ' + item.price}</Text>
               </View>
            </View>
            </TouchableWithoutFeedback>

      );
   }

   

   addTag = (tag) => {
     
      let data = this.state.data;
      let dataFiltered = [];
      let price = 0;
      data.forEach(element=>{
         if(element['tags'].indexOf(tag)!=-1){
            dataFiltered.push(element);
         }
      });
      if(this.state.flagFlter){
         dataFiltered = dataFiltered.concat(this.state.dataFiltered)
         dataFiltered = [...new Set(dataFiltered)];
         //console.log(dataFiltered);
      }
      dataFiltered.forEach(el=>{
         price += el['price'];
      })
      this.setState({ dataFiltered: dataFiltered, flagFlter:1 , price:price});
      //console.log(this.state.dataFiltered);
   }

   removeTag = (tag) => {
      let dataFiltered = this.state.dataFiltered;
      i = 0;
      let price=0;
      while(i<dataFiltered.length){
         if(dataFiltered[i]['tags'].indexOf(tag) != -1 ){
            dataFiltered.splice(i,1);
         }else{
            price += dataFiltered[i]['price'];
            i++;
         }         
      }
      if(dataFiltered.length>0){ 
         this.setState({dataFiltered: dataFiltered, price:price})
      } else{            
         this.setState({dataFiltered:this.state.data, flagFlter:0, price:this.state.totalPrice})
      }

   }


  

   render() {

      console.disableYellowBox = true;

      return (        

         <View style={styles.container}>

            <DateTimePicker
            isVisible={this.state.isVisible}
            onConfirm={this.handlePicker}
            onCancel={this.hidePicker}/>

            <View style={styles.addExpanse}>

               <View style={{ justifyContent: 'space-around', marginTop: 10, }}>
                  <TouchableOpacity onPress={this.showPicker}>
                     <Text style={{ fontSize: 25, textAlign: "center" }}>{this.state.thisMonth}</Text>
                  </TouchableOpacity>
               </View>


               <FlatList
                  style={{}}
                  horizontal
                  contentContainerStyle={[styles.FlatList, { paddingTop: 10, paddingBottom: 15 }]}
                  data={this.state.tags}
                  renderItem={({ item }) => <Item removeTag={this.removeTag.bind(this)} addTag={this.addTag.bind(this)} data={item} />}
                  showsHorizontalScrollIndicator={false}
               />

               <FlatList
                  data={this.state.dataFiltered}
                  renderItem={({ item }) => (this.flatRender(item))}
               />

               <View style={{ justifyContent: 'center', padding: 10, height: 70 }}>
                  <Text style={{ fontSize: 20, textAlign: "right", paddingRight: 10 }}>Total de gastos: R$ {parseFloat(this.state.price).toFixed(2)}</Text>
               </View>

            </View>
         </View>

      );
   }
}

