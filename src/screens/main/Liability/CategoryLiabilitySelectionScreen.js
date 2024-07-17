import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { useEffect, useState } from "react";
import { retrieveCategory } from "../../../firebase/UserModel";
import { resetIcon } from "../../../navigators/IncomeStackNav";
import { useDispatch } from 'react-redux';
import { setSelectedItems, setItemCategory, setItemData } from '../../../redux/variableSlice'
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { RemoveCategoryIcon } from "../../../firebase/UserModel";
import { setEditStatus } from "../../../redux/variableSlice";
import { useSelector } from "react-redux";

export const CategoryLiabilitySelectionScreen = ({navigation})=>{

    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    //console.log(userUID);

    const editStatus = useSelector((state)=>state.variables.isEdit)
    //console.log(editStatus);

    const selectedItems = useSelector(state => state.variables.selectedItems);
    //console.log(selectedItems);

    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);
    
    const [category1, setCategory1] = useState([]);
    const [category2, setCategory2] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    

    useEffect(() => {
        retrieveData();
    }, [isDelete]);

    const success = ()=>{
        setIsDelete(!isDelete)
        setIsEdit(false)
        dispatch(setEditStatus(false));
    }

    const retrieveData = async () => {
        try {
            const items1 = [];
            const items2 = [];

            const categoryData = await retrieveCategory(userUID);
            for (const item of categoryData) {
                if (item.category == "หนี้สินระยะสั้น") {
                    items1.push(item);
                }
            }

            for (const item of categoryData) {
                if (item.category == "หนี้สินระยะยาว") {
                    items2.push(item);
                }
            }
            setCategory1(items1);
            setCategory2(items2);
            //setCategory1([categoryData][0]);
            //console.log(category1);
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedItems.includes(item);
       
        return(
            <TouchableOpacity style={{width:'20%', height:'50%', alignItems:'center', marginVertical:5}}
                disabled={editStatus ? (item.subCategory == 'เพิ่ม' ? true : false) : false}
                onPress={() => handleItemPress(item)}
            >
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    {isSelected ? (
                        <Image source={require('../../../assets/circleGreen.png')} width={25} height={25} />
                        ) : (
                        <Image source={require('../../../assets/circle.png')} width={25} height={25} />
                    )}
                    <Image style={{position:'absolute'}} source={{uri: item.photoURL}} width={23} height={23}/>
                </View>
                
                <Text style={{fontSize:12, fontWeight:'bold'}}>{item.subCategory}</Text>
            </TouchableOpacity>
        )
    };

    const handleItemPress = (item) => {
        if (!editStatus) {
            if(item.subCategory != 'เพิ่ม'){
                dispatch(setItemData(item))
                navigation.navigate('AddInputScreen');
            }else{
                dispatch(setItemCategory(item.category));
                navigation.navigate('AddCategoryScreen');
            }

            
        } else {
            const isItemSelected = selectedItems.includes(item);
    
            if (isItemSelected) {
                dispatch(setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item)));
            } else {
                dispatch(setSelectedItems([...selectedItems, item]));
                //console.log(selectedItems);
            }
        }
    };

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#fffffa'}}>
            <View style={{flex:1}}>
                <View style={{flexDirection: 'row', height:80, backgroundColor:'#0ABAB5', alignItems:'center', justifyContent:'space-between'}}>
                    <TouchableOpacity style={{marginLeft:15}}
                        onPress={()=>{
                            if(isEdit){
                                dispatch(setSelectedItems([]));
                                dispatch(setEditStatus(false));
                                setIsEdit(false)
                            }else{
                                navigation.navigate('FinancialScreen');
                            }
                        }}>
                            {isEdit ? (
                            <Image source={require('../../../assets/cancelIcon.png')} width={30} height={30} color="#ffffff"/>
                            ) : (
                            <IconAntDesign name="arrowleft" size={30} color="#ffffff"/>
                        )}
                    </TouchableOpacity>
                    <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:24, color:'#ffffff'}}>หนี้สิน</Text>
                    <TouchableOpacity style={{marginRight:15}}
                        onPress={()=>{
                            if(!isEdit){
                                dispatch(setEditStatus(true));
                                setIsEdit(true);
                            }else{
                                //console.log(selectedItems);
                                RemoveCategoryIcon(userUID, selectedItems, success)
                            }
                        }}>
                            {isEdit ? (
                            <Image source={require('../../../assets/trashIcon.png')} width={30} height={30} color="#ffffff"/>
                            ) : (
                            <IconFeather name="edit" size={30} color="#ffffff" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:9,padding:5,backgroundColor:'#fffffa'}}>
                    <View style={{flex:3, marginVertical:10}}>
                        <Shadow style={{width:'100%', height:'100%'}} distance={7} startColor={"#0ABAB5"} offset={[8,6]}>
                            <View style={styles.box}>
                                <View style={styles.boxhead}>
                                    <Text style={styles.headerText}>หนี้สินระยะสั้น</Text>
                                </View>
                                <View style={{flex:3}}>
                                    <FlatList
                                        data={category1}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={renderItem}
                                        numColumns={5}
                                    />
                                </View>
                            </View>
                        </Shadow>
                    </View>
                    
                    <View style={{flex:3, marginVertical:10}}>
                        <Shadow style={{width:'100%', height:'100%'}} distance={7} startColor={"#0ABAB5"} offset={[8,6]}>
                            <View style={styles.box}>
                                <View style={styles.boxhead}>
                                    <Text style={styles.headerText}>หนี้สินระยะยาว</Text>
                                </View>
                                <View style={{flex:3}}>
                                    <FlatList
                                        data={category2}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={renderItem}
                                        numColumns={5}
                                    />
                                </View>
                            </View>
                        </Shadow>
                    </View>
                    <View style={{flex:3}}>

                    </View>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerText:{
        fontFamily:'ZenOldMincho-Bold', 
        textAlign:'center', 
        fontSize:17, 
        fontWeight: 'bold', 
        color:'#0ABAB5'
    },
    box:{
        flex:1, 
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa'
    },
    boxhead:{
        flex:1, 
        borderTopLeftRadius:15, 
        borderBottomWidth:1, 
        borderColor:'#000000',  
        borderTopRightRadius:15, 
        justifyContent:'center', 
        backgroundColor:'#fffffa'
    }
})