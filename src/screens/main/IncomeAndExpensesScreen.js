import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { retrieveSelectedDataIncomeAndExp, retrieveAllDataIncomeAndExpenses } from "../../firebase/UserModel";
import { useSelector } from "react-redux";
import { setItemTransactionType, setItemData, setCameFrom } from "../../redux/variableSlice";
import moment from 'moment';
import 'moment/locale/th'; 


export const IncomeAndExpensesScreen = ({navigation})=>{
    
    const dispatch = useDispatch();


    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const cameFrom = useSelector((state)=>state.variables.cameFrom);
    let selectedDate = useSelector((state)=>state.variables.selectedDate);
    console.log(selectedDate)

    const [incomeAndExpensesDataSelected, setIncomeAndExpensesDataSelected] = useState({})
    const [incomeValuesAll, setIncomeValuesAll] = useState()
    const [expensesValuesAll, setExpensesValuesAll] = useState()
    const [incomeValuesSelected, setIncomeValuesSelected] = useState()
    const [expensesValuesSelected, setExpensesValuesSelected] = useState()

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เนื่องจาก getMonth() เริ่มจาก 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    moment.locale('th');
    let thaiMonth = moment(formattedDate).format('MMMM');
    let thaiDay = moment(formattedDate).format('dddd');
    if(selectedDate != ""){
        thaiMonth = moment(selectedDate).format('MMMM');
        thaiDay = moment(selectedDate).format('dddd');
    }

    useEffect(() =>{
        dispatch(setItemTransactionType(''))
    })
    useEffect(() => {
        getDataIncomeAndExpenses();
    }, [selectedDate, incomeValuesSelected,expensesValuesSelected,isUpdate]);

    const getDataIncomeAndExpenses = async()=>{
        try{
            const itemAllDataIncomeAndExpenses = await retrieveAllDataIncomeAndExpenses(userUID)
            if(selectedDate == ""){
                selectedDate = formattedDate
            }
            const itemSelectedDataIncomeAndExpenses = await retrieveSelectedDataIncomeAndExp(userUID,selectedDate)
            setIncomeAndExpensesDataSelected(itemSelectedDataIncomeAndExpenses)
            setIncomeValuesAll(getIncomeValues(itemAllDataIncomeAndExpenses.income))
            setExpensesValuesAll(getExpensesValues(itemAllDataIncomeAndExpenses.expenses))
            setIncomeValuesSelected(getIncomeValues(itemSelectedDataIncomeAndExpenses))
            setExpensesValuesSelected(getExpensesValues(itemSelectedDataIncomeAndExpenses))
            
        }catch (error) {
            console.error('Error getDataIncomeAndExpenses:', error);
        }  
    }

    const getIncomeValues = (itemData)=>{
        let incomeValues = 0;
        itemData.forEach(element => {
            if(element.transactionType == 'รายได้'){
                incomeValues += parseFloat(element.value);
            }
        });
        
        return incomeValues
    }

    const getExpensesValues = (itemData)=>{
        let expensesValues = 0;
        itemData.forEach(element => {
            if(element.transactionType == 'ค่าใช้จ่าย'){
                expensesValues += parseFloat(element.value);
            }
        });
        
        return expensesValues
    }

    const handleItemPress = (item) => {
        dispatch(setItemData(item))
        dispatch(setCameFrom("IncomeAndExpenseScreen"));
        navigation.navigate('DetailScreen');
    };

    const renderItem = ({ item })=>{
        return(
            <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical:10}}
                onPress={() => handleItemPress(item)}
            >
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../assets/circle.png')} width={25} height={25}/>
                    <Image source={{uri:item.photoURL}} width={25} height={25} style={{position:'absolute'}}/>
                </View>
                <View style={{flex:2.5, justifyContent:'center', marginLeft:20}}>
                    <Text style={styles.details}>{item.subCategory}</Text> 
                </View>
                <View style={{flex:2, flexDirection:'row', justifyContent:'flex-end', alignItems:'center', marginRight:20}}>
                    <Text style={{ fontFamily:'ZenOldMincho-Regular',fontSize:14,color:item.transactionType == 'รายได้' ? '#0abab5' : '#ff0000'}}>{item.value}</Text>
                    <Text> THB</Text>
                </View>
            </TouchableOpacity>
        ) 
    }
    
    return(
        <ScrollView style={{backgroundColor:'#fffffa'}}>
            <View style={{height:140, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:30, marginHorizontal:40, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10}}>
                    <Text style={styles.headerText}>ยอดเงินคงเหลือ</Text>
                    <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>ข้อมูล ณ ปัจจุบัน</Text>
                </View>

                <View style={{flex:1, paddingLeft:10, paddingTop:5}}>
                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Black', fontSize:16}}>{incomeValuesAll - expensesValuesAll} THB</Text>
                </View>

                <View style={{flex:1.2, flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={styles.subHeaderText}>รายได้</Text>
                        <Text style={styles.subHeaderText}>{incomeValuesAll} THB</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>รายจ่าย</Text>
                        <Text style={styles.subHeaderText}>{expensesValuesAll} THB</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10,borderBottomWidth:1,borderColor:'#D2DBD6'}}>
                    <Text style={[styles.headerText,{flex:1}]}>{selectedDate ? selectedDate.slice(-2) : day}</Text>
                    <View style={{flex:3, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>{thaiDay}</Text>
                        <Text style={styles.subHeaderText}>{thaiMonth}</Text>
                    </View>
                    <View style={{flex:2, flexDirection:'row', paddingLeft:0, borderLeftWidth:1, borderColor:'#D2DBD6',}}>
                        <View style={{flex:1, flexDirection:'column', paddingLeft:5}}>
                            <Text style={styles.subHeaderText}> รายได้</Text>
                            <Text style={styles.income}>{incomeValuesSelected}</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'column', paddingLeft:0}}>
                            <Text style={styles.subHeaderText}>ค่าใช้จ่าย</Text>
                            <Text style={styles.expenses}>{expensesValuesSelected}</Text>
                        </View>
                </View>
            </View>
            <FlatList 
                    data={incomeAndExpensesDataSelected}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:14,
        color:'#000000'
    },

    subHeaderText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    },
    
    income:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#0ABAB5'
    },
    expenses:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#FF0000'
    },
    circle: {
        width: 40,
        height: 40,
        
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    details:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:16,
        color:'#000000',
    }, 
    
})