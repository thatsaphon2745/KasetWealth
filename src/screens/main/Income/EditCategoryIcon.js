import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { useDispatch } from 'react-redux';
import { setItemPhotoURL } from "../../../redux/variableSlice";

export const EditCategoryIcon = ({route, navigation})=>{

    const dispatch = useDispatch();

    const renderItemEditCategoryIconScreen = ({ item }) => (
    
        <View style={styles.CategoryIcon}>
            <TouchableOpacity style={styles.icon}
                onPress={() => handleItemPress(item)}>
                <Image source={require('../../../assets/white_circle.png')}/>
                <Image style={{position:'absolute'}} source={{uri: item.photoURL}} width={35} height={35}/>
            </TouchableOpacity>
        </View>
    );
    
    const handleItemPress = (item) => {
        // ทำการนำข้อมูลไปยังหน้าถัดไป
        dispatch(setItemPhotoURL(item.photoURL));
        navigation.navigate('AddCategoryScreen');
    };
    
    return(
        <SafeAreaView style={{flex:1, padding:5, backgroundColor:'#fffffa'}}>
            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%'}} distance={5} startColor={'#0ABAB5'} offset={[6, 8]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>
                                การเงิน
                            </Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList
                                data={CategoryFinancial}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItemEditCategoryIconScreen}
                                numColumns={5}
                            />
                        </View>
                    </View>
                </Shadow>
            </View>
            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%'}} distance={5} startColor={'#0ABAB5'} offset={[6, 8]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>
                                อาหาร
                            </Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList
                                data={CategoryFood}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItemEditCategoryIconScreen}
                                numColumns={5}
                            />
                        </View>
                    </View>
                </Shadow>
            </View>
            <View style={{flex:1, marginVertical:10}}>
                <Shadow style={{width:'100%'}} distance={5} startColor={'#0ABAB5'} offset={[6, 8]}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>
                                ความงาม
                            </Text>
                        </View>
                        <View style={{flex:3}}>
                            <FlatList
                                data={CategoryFairness}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItemEditCategoryIconScreen}
                                numColumns={5}
                            />
                        </View>
                    </View>
                </Shadow>
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
        height:167, 
        borderRadius:16,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa', 
        marginBottom:10,
        marginVertical:5
    },
    boxhead:{
        height:50, 
        borderTopLeftRadius:15, 
        borderBottomWidth:1 , 
        borderColor:'#000000',  
        borderTopRightRadius:15, 
        justifyContent:'center', 
        backgroundColor:'#fffffa'
    },
    CategoryIcon:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon:{
        flex:1,
        alignItems: 'center',
        marginVertical:10,
        marginBottom:10
    }
})



const CategoryFinancial = [
    {
        category: "การเงิน",
        subCategory: "index0",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601459531644938/index0.png?ex=65ce0ce3&is=65bb97e3&hm=51fd08e95ffe0de6d1cf6ad3d2918fc6948a5991821f6db3b33df567711334b7&'
    },
    {
        category: "การเงิน",
        subCategory: "index1",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601459779375174/index1.png?ex=65ce0ce3&is=65bb97e3&hm=66f8b861c107a2325bf01a7cacb724c9bde1aee6a874e8d8684a30d4caac94ad&'
    },
    {
        category: "การเงิน",
        subCategory: "index2",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601460031029328/index2.png?ex=65ce0ce3&is=65bb97e3&hm=d335330c320ef6638131f824d439ac835daed343b056c071a61e622995aa37be&'
    },
    {
        category: "การเงิน",
        subCategory: "index3",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601460257267752/index3.png?ex=65ce0ce3&is=65bb97e3&hm=b020bee4232ad60a86b8bb72855e1803425150449fe757522268e9b6d46020d4&'
    },
    {
        category: "การเงิน",
        subCategory: "index4",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601460538548314/index4.png?ex=65ce0ce3&is=65bb97e3&hm=55379d609e0cc7c00dc0948feb8ee2d28e47e2b4a3a0789602f9027da7b6ed40&'
    },
    {
        category: "การเงิน",
        subCategory: "index5",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601460769103912/index5.png?ex=65ce0ce3&is=65bb97e3&hm=d7d66678c9049c4deb470e50fe62e372e45ca1d7748204d9441a139a9f3a3e76&'
    },
    {
        category: "การเงิน",
        subCategory: "index6",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601461024952372/index6.png?ex=65ce0ce3&is=65bb97e3&hm=6c548a6d3088fbb2a2ae337b9f5831e1586c725e71ba303033d74e9895d0e2c4&'
    },
    {
        category: "การเงิน",
        subCategory: "index7",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601461373075466/index7.png?ex=65ce0ce3&is=65bb97e3&hm=584293c4fa6f375a2c9534ff2db29da2e4737c597b7a58ca31f895508133f945&'
    },
    {
        category: "การเงิน",
        subCategory: "index8",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601461666549811/index8.png?ex=65ce0ce3&is=65bb97e3&hm=d406eddb719e65b981138e2d9dc348f9c1c6b524124d9f4dab0aed4abca932a7&'
    },
    {
        category: "การเงิน",
        subCategory: "index9",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601461935247391/index9.png?ex=65ce0ce3&is=65bb97e3&hm=8886808e80e326d310008df8d7f3cb5d8e74352e9fc4e91b623c7fc26e4cb471&'
    },
]

const CategoryFood = [
    {
        category: 'อาหาร',
        subCategory: "index0",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601737534312518/index0.png?ex=65ce0d25&is=65bb9825&hm=9c152a8c265b9725584a7ba45218804851e30fa47937fdc7f34cd887c3a9326f&'
    },
    {
        category: 'อาหาร',
        subCategory: "index1",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601737748484206/index1.png?ex=65ce0d25&is=65bb9825&hm=912b5f2ecef5595a38d71998a160773f80dccfa39b49818e957553900bd636a0&'
    },
    {
        category: 'อาหาร',
        subCategory: "index2",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601737974841344/index2.png?ex=65ce0d25&is=65bb9825&hm=817c347aa35228264eaee0945c3bd209e6c03c0b97d2751e3c579a5c6367bf61&'
    },
    {
        category: 'อาหาร',
        subCategory: "index3",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601738540941312/index3.png?ex=65ce0d25&is=65bb9825&hm=5266c7f11476c6fd7fb39485ca89458f09e99433ab0721c9b20389098a40c679&'
    },
    {
        category: 'อาหาร',
        subCategory: "index4",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601738864041994/index4.png?ex=65ce0d25&is=65bb9825&hm=63278f5a501cd838288c8d989248ed342a951e5b9543e75fcf498b5687bde496&'
    },
    {
        category: 'อาหาร',
        subCategory: "index5",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601739094724668/index5.png?ex=65ce0d25&is=65bb9825&hm=022ef95ed905333eadab02a5eb3733ea6e3d32f08de469045a02e47afbd9ae1c&'
    },
    {
        category: 'อาหาร',
        subCategory: "index6",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601739404976149/index6.png?ex=65ce0d25&is=65bb9825&hm=18767af71c22cd86efcd79d56d2f583e12d718bd6a21ca02b53d8ac1600d85b8&'
    },
    {
        category: 'อาหาร',
        subCategory: "index7",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601739753357354/index7.png?ex=65ce0d26&is=65bb9826&hm=d7173871f5d95c46a26148ef27f42023194408dab36304ed46a042ba7ef775fe&'
    },
    {
        category: 'อาหาร',
        subCategory: "index8",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601739983785984/index8.png?ex=65ce0d26&is=65bb9826&hm=e21746bd96ab0d550c711173e21fcf76b51779696137bc635e3ddf24aed19202&'
    },
    {
        category: 'อาหาร',
        subCategory: "index9",
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202601740307009586/index9.png?ex=65ce0d26&is=65bb9826&hm=3d71004fb457c35ef2762392333b144ee26971ef7a9fc27f716e2512a9af6b3f&'
    }
]

const CategoryFairness = [
    {
        category: 'ความงาม',
        subCategory: 'index0',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602002052284426/index0.png?ex=65ce0d64&is=65bb9864&hm=6d0b949cd2e70888dbc048e45c2357c41ac1356cfd7442515b8c4253edce93c9&'
    },
    {
        category: 'ความงาม',
        subCategory: 'index1',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602002291494922/index1.png?ex=65ce0d64&is=65bb9864&hm=17a79fe03538c23e8d681a3276e8489a370674b6255ad6a101542bacf502a39a&'
    },
    {
        category: 'ความงาม',
        subCategory: 'index2',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602002580770876/index2.png?ex=65ce0d64&is=65bb9864&hm=edc0fc5347c0c0df26c4314e76f303e4f1b5ab61d5baec84bce755f4d07f1821&'
    },
    {
        category: 'ความงาม',
        subCategory: 'index3',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602002828492881/index3.png?ex=65ce0d64&is=65bb9864&hm=37b948ce863ba49e3d8e40775f881d8661ced600ad266620198a1233959a1141&'
    },
    {
        category: 'ความงาม',
        subCategory: 'index4',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602003059183656/index4.png?ex=65ce0d64&is=65bb9864&hm=d16d50015f395108b8911f3743b9a81041e6de4fa5b2402989e9e595927a2d0c&'
    },
    {
        category: 'ความงาม',
        subCategory: 'index5',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602003335880744/index5.png?ex=65ce0d64&is=65bb9864&hm=e617d0fc9f7295043fe4f85e30c0d8b247b40fdd76cbd0708b0597d18d3edbea&'
    },
    {
        category: 'ความงาม',
        subCategory: 'index6',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602003621224488/index6.png?ex=65ce0d64&is=65bb9864&hm=4b9c988a23a1a6185d107a7471e8535a3afcc8547f757b2c052095f2aaceb8fa&'
    },
    {
        category: 'ความงาม',
        subCategory: 'index7',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602004447363082/index7.png?ex=65ce0d65&is=65bb9865&hm=c1e6fc742931037ee721f3489c1bccc3bebd7d416540d3dfbcf1b55ca12d5f42&'
    },
    {
        category: 'ความงาม',
        subCategory: 'index8',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602004929585212/index8.png?ex=65ce0d65&is=65bb9865&hm=b420ac533b922088f758585155d362d74ac083b9e3dc3dc83bbdfe0d90a1991f&'
    },
    {
        category: 'ความงาม',
        subCategory: 'index9',
        photoURL: 'https://cdn.discordapp.com/attachments/1202281623585034250/1202602005185429514/index9.png?ex=65ce0d65&is=65bb9865&hm=c0532044e39ee5d18501d1149c9295d3e6363b9ea4b9ae863656ee03defdabae&'
    }
]