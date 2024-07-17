import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AssetLiabilityDetailScreen } from "./AssetLiabilityDetailScreen";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setItemTransactionType } from "../../redux/variableSlice";
import { retrieveAllDataIncomeAndExpenses, retrieveDataLiabilityRemaining, retrieveDataAsset } from "../../firebase/RetrieveData";
import { getNetWealth } from "../../Calculate/Calculate";

export const FinancialScreen = ({navigation})=>{
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;

    const isUpdate = useSelector((state)=>state.variables.isUpdate);

    const [incomeValuesAll, setIncomeValuesAll] = useState()
    const [expensesValuesAll, setExpensesValuesAll] = useState()
    const [assetValuesAll, setAssetValuesAll] = useState()
    const [liabilityValuesAll, setLiabilityValuesAll] = useState()

    useEffect(() => {
        getDataIncomeAndExpenses();
        getDataAsset();
        getDataLiabilityRemaining();
        getNetWealth();
    }, [incomeValuesAll, expensesValuesAll, assetValuesAll, liabilityValuesAll, isUpdate]);

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

    const getDataIncomeAndExpenses = async()=>{
        try{
            const itemAllDataIncomeAndExpenses = await retrieveAllDataIncomeAndExpenses(userUID)
        
            setIncomeValuesAll(getIncomeValues(itemAllDataIncomeAndExpenses.income))
            setExpensesValuesAll(getExpensesValues(itemAllDataIncomeAndExpenses.expenses))
            
        }catch (error) {
            console.error('Error getDataIncomeAndExpenses:', error);
        }  
    }

    const getAssetValues = (itemsDataAsset)=>{
        let assetValues = 0;
        itemsDataAsset.liquid.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        itemsDataAsset.invest.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        itemsDataAsset.personal.forEach(element => {
            assetValues += parseFloat(element.value);
        });
        
        return assetValues
    }

    const getDataAsset = async()=>{
        try{
            const itemsDataAsset = await retrieveDataAsset(userUID);
            setAssetValuesAll(getAssetValues(itemsDataAsset))
        } catch (error){
            console.error('Error getDataAsset:', error);
        }
    }
    
    const getLiabilityValues = (itemsDataLiability)=>{
        let liabilityValues = 0;
        itemsDataLiability.short.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        itemsDataLiability.long.forEach(element => {
            liabilityValues += parseFloat(element.value);
        });
        
        return liabilityValues
    }

    const getDataLiabilityRemaining = async()=>{
        try{
            const itemsDataLiabilityRemaining = await retrieveDataLiabilityRemaining(userUID);
            setLiabilityValuesAll(getLiabilityValues(itemsDataLiabilityRemaining))
        } catch (error){
            console.error('Error getDataLiability:', error);
        }
    }  

    return(
        <SafeAreaView style={{flex:1, padding:30, backgroundColor:'#fffffa'}}>
            {/* ยอดเงินคงเหลือ */}
            <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10}}>
                    <Text style={styles.headerText}>ยอดเงินคงเหลือ</Text>
                    <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>ข้อมูล ณ ปัจจุบัน</Text>
                </View>

                <View style={{flex:1, paddingLeft:10, paddingTop:5}}>
                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Black', fontSize:16}}>
                        {isNaN(incomeValuesAll-expensesValuesAll) ? 0 : incomeValuesAll-expensesValuesAll} THB
                    </Text>
                </View>

                <View style={{flex:1.5, flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={styles.subHeaderText}>รายได้</Text>
                        <Text style={styles.subHeaderText}>{incomeValuesAll} THB</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>รายจ่าย</Text>
                        <Text style={styles.subHeaderText}>{expensesValuesAll} THB</Text>
                    </View>
                </View>

                <View style={{flex:2, paddingHorizontal:5}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:1, borderTopWidth:1, borderColor:'#D2DBD6'}}>
                        <TouchableOpacity style={{flex:1, padding:5}}
                            onPress={()=>{
                                navigation.navigate('IncomeAndExpensesScreen')
                            }}>
                            <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>{"แสดงรายละเอียดเพิ่มเติม  >"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* ความมั่งคั่งสุทธิ */}
            <View style={{flex:1, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10}}>
                    <Text style={styles.headerText}>ความมั่งคั่งสุทธิ</Text>
                    <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>ข้อมูล ณ ปัจจุบัน</Text>
                </View>

                <View style={{flex:1, paddingLeft:10, paddingTop:5}}>
                    <Text style={{flex: 1, color: '#0ABAB5', fontFamily: 'ZenOldMincho-Black', fontSize: 16}}>
                        {isNaN(assetValuesAll - liabilityValuesAll) ? 0 : assetValuesAll - liabilityValuesAll} THB
                    </Text>
                </View>

                <View style={{flex:1.5, flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={styles.subHeaderText}>สินทรัพย์รวม</Text>
                        <Text style={styles.subHeaderText}>{assetValuesAll} THB</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>หนี้สินรวม</Text>
                        <Text style={styles.subHeaderText}>{liabilityValuesAll} THB</Text>
                    </View>
                </View>

                <View style={{flex:2, paddingHorizontal:5}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:1, borderTopWidth:1, borderColor:'#D2DBD6'}}>
                        <TouchableOpacity style={{flex:1, padding:5}}
                            onPress={()=>{
                                navigation.navigate('AssetLiabilityDetailScreen');
                            }}
                        >
                            <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>{"แสดงรายละเอียดเพิ่มเติม  >"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{flex:0.5, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:10, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={{flex:1, alignItems:'center'}} 
                        onPress={()=>{
                            dispatch(setItemTransactionType("รายได้"));
                            navigation.navigate('CategorySelectionScreen')
                            
                        }}
                    >
                        <Image source={require('../../assets/revenueIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>รายได้</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center'}}
                        onPress={()=>{
                            dispatch(setItemTransactionType("ค่าใช้จ่าย"));
                            navigation.navigate('CategoryExpensesSelectionScreen')
                        }}
                    >
                        <Image source={require('../../assets/expenseIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>ค่าใช้จ่าย</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center'}}
                        onPress={()=>{
                            dispatch(setItemTransactionType("สินทรัพย์"));
                            navigation.navigate('CategoryAssetSelectionScreen')
                        }}>
                        <Image source={require('../../assets/assetIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>สินทรัพย์</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center'}}
                        onPress={()=>{
                            dispatch(setItemTransactionType("หนี้สิน"));
                            //รอหน้าเพื่อนเสร็จ
                            navigation.navigate('CategoryLiabilitySelectionScreen')
                        }}>
                        <Image source={require('../../assets/liabilityIcon2.png')} style={{width: 50, height:50}} />
                        <Text style={[styles.bodyText,{paddingTop:5}]}>หนี้สิน</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:16,
        color:'#000000'
    },

    subHeaderText:{
        fontFamily:'ZenOldMincho-Bold',
        fontSize:14,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    }
    
})