import React, { Component } from 'react';
import { StatusBar, Text, Modal,Button, View, TextInput, FlatList, ToastAndroid, Picker, TouchableOpacity, AsyncStorage } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment";
import 'moment/locale/pt-br';
//import firebase from 'firebase';
import { TextInputMask } from 'react-native-masked-text'

Datastore = require('react-native-local-mongodb');
db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
dbTags = new Datastore({ filename: 'dbTags', autoload: true });

import Item from '../Item'
import styles from '../../styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default class InsertView extends Component {

   constructor(props) {

      super(props);

      this.state = {
         modalVisible: false,
         isVisible: false,
         date: 'hoje',
         hashTags: [
            { key: "1", tags: '#mercado' },
            { key: "2", tags: '#compras' },
            { key: "3", tags: '#bar' },
            { key: "4", tags: '#comida' },
            { key: "5", tags: '#empréstimo' },
            { key: "6", tags: '#roupa' },
            
         ],

         description: '',
         price: '',
         tags: [],
         dateTime: '',
         insertTag:'',
         totalPrice:0,
         parcels:1,

         errorColor: '#FCFCFC',

     
      };

      AsyncStorage.getItem('isFirst').then((isFirst)=>{
         if(isFirst!='true'){
            let hashTags= [{ tags: '#comida'}, {tags:'#conta'}, {tags:'#bar'}, {tags:'#PressPor2segParaExcluir'}];
            let aux = [
               {description: 'Dica01',price:0, date:moment(new Date()).format('ll'), tags: ['#Pressione e segure para excluir']}, 
               {description: 'DIca02',price:0, date:moment(new Date()).format('ll'),tags: ['#Filtre seus gastos por tag']},
               {description: 'Dica03',price:0, date:moment(new Date()).format('ll'),tags: ['#Alterne entre os meses tocando na data']}, 
            ];
            dbTags.insert(hashTags, function (err, newDocs) {});
            db.insert(aux, function (err, newDocs) {});
            this.updateTags();
            AsyncStorage.setItem('isFirst', 'true');
         }
      });
      


     

      this.state.dateTime = new Date().toString();
      this.state.date = moment(new Date()).format('ll');
      this.insertSpent = this.insertSpent.bind(this);

      let flag = false;

      const didBlurSubscription = this.props.navigation.addListener(
         'willFocus',
         payload => {
            if(!flag)
            { this.updateTags(); flag=true;}
         })

   
    

   }


   updateTags = ()=>{

      let aux=[]
      this.setState({
         hashTags:aux,
      });
      dbTags.find({}, function (err, docs) {
         docs.forEach(el => {
            aux.push(el);
         });
      });

           

      set = (totalPrice)=> {
         this.setState({
            hashTags:aux,
            totalPrice:totalPrice
         });
      };

      let date = this.state.date.split(" ");
      let myRe = new RegExp(date[2]); 

      db.find({ date: myRe }, function (err, docs) {
         let totalPrice=0;
         docs.forEach(element => {
            totalPrice += parseFloat(element['price']);
         });
         set(totalPrice.toFixed(2))
      });

   }

     

   showPicker = () => { this.setState({ isVisible: true }) }
   hidePicker = () => { this.setState({ isVisible: false }) }
   handlePicker = (chosenDate) => {
      this.setState({
         isVisible: false,
         dateTime: chosenDate.toString(),
         date: moment(chosenDate).format('ll'),
      })
   }
   insertSpent = () => {
      let description = this.state.description;
      let date = this.state.date;
      let price = this.state.price;
      let tags = this.state.tags;
      let parcels = this.state.parcels;

      if (price == '') {
         this.setState({ errorColor: '#F9E5EA' });
         setTimeout(() => this.setState({ errorColor: '#FCFCFC' }), 200);
         ToastAndroid.show('Informe o valor do gasto', ToastAndroid.TOP);

      } else {
         if(tags.length==0){tags.push('#Outros')}

         let aux = {
            description: description,
            date: date,
            price: price,
            tags: tags,
         };

         insert = (aux2) =>{
            db.insert([aux2], function (err, newDocs) {
               ToastAndroid.show("Gasto adicionado!", ToastAndroid.SHORT);
            });
         }

         if(parcels==1){
            insert(aux);
         }else{
            a = new Date();
            let i=0
            while(i<parcels){               
               newDate = new Date(a.getFullYear(), parseInt(a.getMonth())+i, a.getDay());           
               let aux2 = {
                  description: description,
                  date: moment(newDate).format('ll'),
                  price: price/parcels,
                  tags: tags,
               };
               insert(aux2);
               i=i+1;



            }
         }

         this.updateTags();

         this.setState({
            description: '',
            price: '',
            tags:[]
         });
         
      }
   }


   insertTag = ()=>{
      let tagInsert= {tags:'#'+this.state.insertTag}

      dbTags.insert(tagInsert, function (err, newDocs) {            
         ToastAndroid.show('Tag adicionada!', ToastAndroid.SHORT);

      });
      
         this.updateTags();
      
      this.setState({modalVisible:false})
   }

   addTag = (tag) => { 
 
         let tags = this.state.tags;
         tags.push(tag);
         this.setState({tags : tags});
 
   }

   removeTag = (tag) => {
  
         let tags = this.state.tags;
         index = tags.indexOf(tag);
         tags.splice(index, 1);
         this.state.tags = tags;

   }

   newTag = ()=>{
      this.setState({modalVisible:true})
   }

   deleteTag = (id) =>{
      dbTags.remove({ _id: id }, {}, function (err, numRemoved) {
         if(numRemoved==1){
            ToastAndroid.show('Tag deletada!', ToastAndroid.SHORT);  
         }
       });
       this.updateTags();
   }




   render() {

      console.disableYellowBox = true;

      return (

         <View style={styles.container}>
         <StatusBar translucent backgroundColor="#000"  barStyle="light-content"/>
         <Modal  transparent={true}  animationType="fade" visible={this.state.modalVisible}>

            <View  style={{backgroundColor:'#000000aa', flex:1, justifyContent:'center'}}>
               <View  style={{flexDirection:'row', justifyContent:'center', backgroundColor:'#fff', padding:20}}>
                  <Text style={{fontWeight:'500', fontSize:20, marginTop:7}}>#</Text>
                  <TextInput  value={this.state.insertTag} onChangeText={(tag) => this.setState({ insertTag:tag })} placeholder="Categoria" />  
               </View>
               <View  style={{backgroundColor:'#fff', flexDirection:'row', justifyContent:'space-around', paddingBottom:20}}>
                  <Button title="cancelar" onPress={()=>this.setState({modalVisible:false})}/>

                  <Button title="inserir" onPress={this.insertTag}/>
                  
               </View>
            </View>
    
         </Modal>

            <DateTimePicker
               isVisible={this.state.isVisible}
               onConfirm={this.handlePicker}
               onCancel={this.hidePicker}
            />

            <View style={styles.topStatus}>
               <Text style={styles.topStatusContent}>Total  gasto esse mês: R$ {this.state.totalPrice}</Text>
            </View>


            <View style={styles.addExpanse}>



               <View style={styles.input}>
                  <MaterialIcons style={styles.inputIco} name="format-size" />
                  <TextInput value={this.state.description} style={styles.textInput} onChangeText={(description) => this.setState({ description })} placeholder="Descrição do gasto" />
               </View>
               
               <View style={styles.input} >
                  <MaterialIcons style={styles.inputIco} name="today" />
                  <TouchableOpacity onPress={this.showPicker} style={styles.textInput} >
                     <Text style={{ color: '#999' }}>{this.state.date}</Text>
                  </TouchableOpacity>
               </View>

               <View style={[styles.input, { backgroundColor: this.state.errorColor }]}>
                  <MaterialIcons style={styles.inputIco} name="attach-money" />
                  <TextInputMask 
                     type={'money'}
                     value={this.state.price} keyboardType="number-pad" 
                     style={styles.textInput} 
                     ref={(ref) => this.moneyField = ref}
                     onChangeText={(price) => {
                        if(price=='R$0,00'){
                           this.setState({ price: '' })
                        }else{
                           let numberValue = this.moneyField.getRawValue()
                           this.setState({ price: numberValue })
                        }
                     }} 
                     placeholder="Valor" />

                  <Picker
                     selectedValue={this.state.parcels}
                     style={{height: 50, width: 100}}
                     onValueChange={(itemValue, itemIndex) =>
                        this.setState({parcels: itemValue})
                      }
                  >
                  <Picker.Item label="1x" value="1" />
                  <Picker.Item label="2x" value="2" />
                  <Picker.Item label="3x" value="3" />
                  <Picker.Item label="4x" value="4" />
                  <Picker.Item label="5x" value="5" />
                  <Picker.Item label="6x" value="6" />
                  <Picker.Item label="7x" value="7" />
                  <Picker.Item label="8x" value="8" />
                  <Picker.Item label="9x" value="9" />
                  <Picker.Item label="10x" value="10" />
                  <Picker.Item label="11x" value="11" />
                  <Picker.Item label="12x" value="12" />
               </Picker>

               </View>

              






               <View style={{ marginTop: 15, marginRight: 20, marginLeft: 20, flex: 1 , alignItems:'center'}}>

    
                  <TouchableOpacity style={styles.categories}  onPress={this.newTag}>
                     <Text style={styles.categoriesText}>+ Add Tag</Text>
                  </TouchableOpacity>

                  <FlatList
                     style={{ flexWrap: 'wrap', }}
                     contentContainerStyle={[styles.FlatList, {justifyContent:'flex-start'}]}
                     data={this.state.hashTags}
                     renderItem={({ item }) => <Item 
                     deleteTag={this.deleteTag} 
                     removeTag={this.removeTag.bind(this)} 
                     addTag={this.addTag.bind(this)} 
                     data={item} />}
                     keyExtractor={(item, index) => item.id}
                  />
                  

               </View>






               <View style={{ marginTop: 0, height: 60, justifyContent: 'flex-end' }}>


                  <TouchableOpacity onPress={this.insertSpent} style={styles.btSubmit}>
                     <Text style={{ fontSize: 14, color: '#888' }}>Lançar Gasto</Text>
                  </TouchableOpacity>
               </View>


            </View>

         </View>

      );
   }
}

