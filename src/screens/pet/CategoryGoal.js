import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Shadow } from "react-native-shadow-2";
import { useDispatch } from 'react-redux';
import { setItemData } from "../../redux/variableSlice";

export const CategoryGoal = ({navigation})=>{
    const dispatch = useDispatch();

    const renderItem = ({ item }) => {
        return(
            <View style={styles.thirdContainer}>
                <TouchableOpacity style={styles.checkTouchableOpacityContainer}
                    onPress={() => handleItemPress(item)}
                >
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/game_backgroundIcon.png')} style={styles.gameBackgroundIcon} />
                        <Image source={{uri: item.photoURL}} style={styles.gameIcons} />
                    </View>
                    <Text style={styles.BigText}>{item.category}</Text>
                    <Text style={styles.smallText}>-{item.subCategory}</Text>
                    <Text style={{position:'absolute',color:'transparent'}}>{item.questType}</Text>
                    
                </TouchableOpacity>
            </View>
        )         
    }
    
    const handleItemPress = (item) => {
        // ทำการนำข้อมูลไปยังหน้าถัดไป
        dispatch(setItemData(item));
        navigation.navigate('AddGoalScreen');
    };

    return(
       <SafeAreaView style={styles.container}>
            <View style={styles.secondContainer}>
                <FlatList style={{flex:1}}
                    data={firstCategoryFinancial}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    numColumns={2}
                    scrollEnabled={false}
                />
                <View style={{flex:1}}>
                    <TouchableOpacity style={styles.checkTouchableOpacityContainer}
                        onPress={() => handleItemPress(secondCategoryFinancial[0])}
                    >
                        <View style={styles.imageContainer}>
                            <Image source={require('../../assets/game_backgroundIcon.png')} style={styles.gameBackgroundIcon} />
                            <Image source={{uri: secondCategoryFinancial[0].photoURL}} style={styles.gameIcons} />
                        </View>
                        <Text style={[styles.BigText,{marginTop:20}]}>{secondCategoryFinancial[0].category}</Text>
                        <Text style={styles.smallText}>-{secondCategoryFinancial[0].subCategory}</Text>
                        <Text style={{position:'absolute',color:'transparent'}}>{secondCategoryFinancial[0].questType}</Text>
                    </TouchableOpacity>
                </View>
            </View>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#B3DBD8',
      
    },
    secondContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:'5%',
        marginVertical:'8%',
        backgroundColor:'#2C6264',
        borderRadius:12,
        borderWidth:1,
        
        
    },
    thirdContainer: {
        width:'50%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    checkTouchableOpacityContainer: {
        flex:1,
        backgroundColor:'transparent',
        justifyContent:'center', 
        alignItems:'center',
    },
    imageContainer: {
        flex:1,
        justifyContent:'center', 
        alignItems:'center',
        marginTop:'35%'
        
    },
    gameBackgroundIcon: {
        width: 100, 
        height:100
    },
    gameIcons: {
        width: 90, 
        height: 90, 
        position: 'absolute',
        borderWidth:2
    },
    BigText: {
        width:'100%',
        color:'white',
        fontFamily:'ZenOldMincho-Regular', 
        marginTop:'5%', 
        fontSize:26,
        textAlign:'center',
        textAlignVertical:'center'
    },
    smallText: {
        flex:1,
        color:'white',
        fontFamily:'ZenOldMincho-Regular', 
        fontSize:12,
        textAlign:'center',  
    }
    
  });

const firstCategoryFinancial = [
    {
        category: "รายได้",
        subCategory: "หาเงินเพิ่ม",
        questType: "Personal Goal",
        photoURL: 'https://cdn.discordapp.com/attachments/951838870272606259/1207602407794675772/game_income.png?ex=65e03e62&is=65cdc962&hm=df67dcce10c0cb83983a1cc4d62708513fdb7f3f12053eb5ce9c93d47678526d&'
    },
    /*{
        category: "ค่าใช้จ่าย",
        subCategory: "ลดการจ่าย",
        questType: "Personal Goal",
        photoURL: 'https://cdn.discordapp.com/attachments/951838870272606259/1207602407501078578/game_expense.png?ex=65e03e62&is=65cdc962&hm=1278b25c57492b3406555f08d57f4fe64d993cd67b8106a2e9f532cfa9cd3081&'
    },*/
    {
        category: "สินทรัพย์",
        subCategory: "ได้รับผลตอบแทน",
        questType: "Personal Goal",
        photoURL: 'https://cdn.discordapp.com/attachments/951838870272606259/1207602407194763314/game_asset.png?ex=65e03e62&is=65cdc962&hm=f8fb0accf16c53d8511d9995b2d095ce0319ae4837b78ce03e37559bcd5bff54&'
    },
    
]

const secondCategoryFinancial = [
    {
        category: "หนี้สิน",
        subCategory: "ชำระหนี้สิน",
        questType: "Personal Goal",
        photoURL: 'https://cdn.discordapp.com/attachments/951838870272606259/1207602409052962816/game_liability.png?ex=65e03e62&is=65cdc962&hm=41e5a8900c315d561f0120e140a9eac27cde927c447b4647253da29b93941214&'
    },
]

