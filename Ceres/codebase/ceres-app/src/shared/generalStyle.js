import {StyleSheet} from "react-native";
   
export const generalStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  topImageIcon: {
    marginTop: 50,
    marginBottom: 40,
    width: 120,
    height: 120,
  },
  paragraph:{
    paddingBottom: 16,
    textAlign: 'left',
  },
  title:{
    color : '#6204a0',
    paddingBottom: 24,
    paddingTop: 16,
  },
  button:{
    marginVertical: 6,
  },
  input:{
    flex: 1,
    height: 40,
    marginTop: 6,
    marginBottom: 12,
    justifyContent:"center"
  },
  inputMask:{
    height: 24,
    padding: 0,
    marginTop: 8, 
    marginLeft:16,
    marginBottom: 8,
  },
  card: {
    shadowColor: "#000", 
    shadowOffset: {	width: 0,	height: 7,},
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14, 
    flexDirection: 'row',
    padding: 16, 
    margin: 16,
    borderRadius: 10, 
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardSection: {
    
     
    padding: 16, 
   
    borderRadius: 10, 
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  
  },
});