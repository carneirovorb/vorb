import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
   check:{
      backgroundColor:'#CB2B52',
  
    },
  
    uncheck:{
      backgroundColor:'#FCF2F5',
    },
  
    categoriesText:{
      fontSize:15, 
      color:'#555'
    },
  
    categories:{
      padding:15,
      borderRadius:15,
      height:35,
      justifyContent:'center',
      margin:5,
      borderWidth:0.2,
      borderColor: '#ddd',
  
    },

  listViewItem:{
    borderWidth:0.3,
    borderColor:'#e7e7e7',
    borderRadius:3,
    height:70,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft:10,
    paddingRight:10,
    marginLeft:10,
    marginBottom:10,
    marginRight:10,


  },




    FlatList:{
      flexGrow: 1, 
      alignItems:'center', 
      justifyContent: 'center',
      flexDirection:'row',
      flexWrap: 'wrap',
  
    },
  
  
    btSubmit:{
      backgroundColor: '#FAFAFA',
      height:60,
      justifyContent:'center',
      alignItems:'center',
  
  
  
    },
  
    input:{
      flexDirection: 'row',
      alignItems:'center',
      backgroundColor: '#FCFCFC',
      marginTop:15,
      marginRight:15,
      marginLeft:15,
      height:55,
      borderWidth:0.2,
      borderRadius:3,
      borderColor: '#ddd',
    },
  
    textInput:{
      height:50,    
      flex:1,
      justifyContent:'center',
    },
  
    inputIco:{
      marginLeft:10,
      marginRight:8,
      color:'#5E5E5E',
      fontSize:22,
      width:24
  
    },
  
    textMenu:{
      textAlign:'right',
      color:'#FFF',
      marginRight:10,
      marginBottom:8,
      fontSize:12
    },
  
    squareButtonIco:{
      color:'#FFF',
      fontSize:22,
  
    },
  
    squareButton: {
      width:90,
      height:40,
      backgroundColor:'#AB2445',
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 4,

    },
  
    container: {
     
      flexDirection:'column',
      backgroundColor: '#CB2B52',
      justifyContent:'space-between',
      padding: 15,
      flex:1,
      
    },
  
    menu:{
      marginTop:20,
      flexDirection:'row',
      justifyContent: 'space-around',
  
    },
  
  
  
    topStatusContent:{
      fontSize:14,
      color: '#fff'
    },
  
    topStatus:{
  
      backgroundColor: '#AB2445',
      borderRadius: 3,
      height:43,    
      alignItems: 'center',
      justifyContent:'center'
    },
  
    addExpanse:{
      backgroundColor: '#FFF',
      flex:1,
      marginTop:15,
      borderRadius: 3,
      flexDirection:'column',
      alignContent: 'space-between',
 
 

    // android (Android +5.0)
    elevation: 3,
    },
  
    section:{
      borderWidth:1,
      flex:1
    }
  
  
  
  });

  export default styles;
  