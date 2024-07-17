import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import { useState, useEffect } from "react"
import { retrieveDataAsset, retrieveDataLiability} from "../../firebase/UserModel"
import { retrieveDataLiabilityRemaining } from "../../firebase/RetrieveData"
import { useSelector } from "react-redux"
import { SafeAreaView } from "react-native-safe-area-context"
import { addTransaction } from "../../firebase/UserModel"
import { useDispatch } from "react-redux";
import { setItemData, setCameFrom } from "../../redux/variableSlice";


export const AssetLiabilityDetailScreen = ({navigation})=>{
    
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    const isUpdate = useSelector((state)=>state.variables.isUpdate);

    const [selectedType,setSelectedType] = useState('graph')
    const [selectedDetail,setSelectedDetail] = useState('asset')
    const [selectedDetailLiability,setSelectedDetailLiability] = useState('All')
    


    const [assetData, setAssetData] = useState({})
    const [assetValues, setAssetValues] = useState()
    const [assetContainerHeight, setAssetContainerHeight] = useState()
    const [liabilityData, setLiabilityData] = useState({})
    const [liabilityRemainingData, setLiabilityRemainingData] = useState({})
    const [liabilityValues, setLiabilityValues] = useState()
    const [liabilityContainerHeight, setLiabilityContainerHeight] = useState()
    const [liabilityRemainingContainerHeight, setLiabilityRemainingContainerHeight] = useState()
    const [netWealthValue, setNetWealthValue] = useState()
    //แยกหมวดหมู่ย่อย asset
    const [assetLiquidValue,setAssetLiquidValue] = useState();
    const [assetInvestValue,setAssetInvestValue] = useState();
    const [assetPersonalValue,setAssetPersonalValue] = useState();
    // แยกหมวดหมูย่อย liability
    const [liabilityShortValues,setLiabilityShortValues] = useState();
    const [liabilityLongValues,setliabilityLongValues] = useState();
    //
    const dispatch = useDispatch();
    
    useEffect(()=>{
        getDataAsset();
        getDataLiability();
        setNetWealthValue(assetValues - liabilityValues)
        getDataLiabilityRemaining();
    },[assetValues, liabilityValues, isUpdate])
        
    const getDataAsset = async()=>{
        try{
            const itemsDataAsset = await retrieveDataAsset(userUID);
            setAssetData(itemsDataAsset);
            let height = 240 + (itemsDataAsset.liquid.length * 50) + (itemsDataAsset.invest.length * 62) + (itemsDataAsset.personal.length * 62)
            setAssetContainerHeight(height)
            setAssetValues(getAssetValues(itemsDataAsset));
            setAssetLiquidValue(getAssetLiquidValue(itemsDataAsset));
            setAssetInvestValue(getAssetInvestValue(itemsDataAsset));
            setAssetPersonalValue(getAssetPersonalValue(itemsDataAsset));
        } catch (error) {
            console.error('Error getDataAsset:', error);
        }
    }

    const getDataLiability = async()=>{
        try{
            const itemsDataLiability = await retrieveDataLiability(userUID);
            //console.log(itemsDataLiability)
            setLiabilityData(itemsDataLiability);
            let height = 240 + (itemsDataLiability.short.length * 50) + (itemsDataLiability.long.length * 50)
            setLiabilityContainerHeight(height)
           
        } catch (error) {
            console.error('Error getDataLiability:', error);
        }
    }

    const getDataLiabilityRemaining = async()=>{
        try{
            const itemsDataLiabilityRemaining = await retrieveDataLiabilityRemaining(userUID)
            //console.log(itemsDataLiabilityRemaining)
            setLiabilityRemainingData(itemsDataLiabilityRemaining)
            
            let lengthOfShortLiabilityRemaining = itemsDataLiabilityRemaining.short.length;
            let lengthOfLongLiabilityRemaining = itemsDataLiabilityRemaining.long.length; 
            let height = 240 + (lengthOfShortLiabilityRemaining * 48) + (lengthOfLongLiabilityRemaining * 48)
            setLiabilityRemainingContainerHeight(height)

            setLiabilityValues(getLiabilityValues(itemsDataLiabilityRemaining));
            setLiabilityShortValues(getLiabilityShortValues(itemsDataLiabilityRemaining));
            setliabilityLongValues(getLiabilityLongValues(itemsDataLiabilityRemaining));
        }catch (error) {
            console.error('Error getLiabilityRemaining:', error);
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
    const getAssetLiquidValue = (itemsDataAsset)=>{
        let assetLiquidValue = 0;
        itemsDataAsset.liquid.forEach(element => {
            assetLiquidValue += parseFloat(element.value);
        });
        
        return assetLiquidValue;
    }
    
    const getAssetInvestValue = (itemsDataAsset)=>{
        let assetInvestValue = 0;
        itemsDataAsset.invest.forEach(element => {
            assetInvestValue += parseFloat(element.value);
        });
        
        return assetInvestValue;
    }

    const getAssetPersonalValue = (itemsDataAsset)=>{
        let assetPersonalValue = 0;
        itemsDataAsset.personal.forEach(element => {
            assetPersonalValue += parseFloat(element.value);
        });
        
        return assetPersonalValue;
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
    const getLiabilityShortValues = (itemsDataLiability)=>{
        let liabilityShortValues = 0;
        itemsDataLiability.short.forEach(element => {
            liabilityShortValues += parseFloat(element.value);
        });
        
        return liabilityShortValues
    }
    const getLiabilityLongValues = (itemsDataLiability)=>{
        let liabilityLongValues = 0;
        itemsDataLiability.long.forEach(element => {
            liabilityLongValues += parseFloat(element.value);
        });
        
        return liabilityLongValues
    }

    

    const percentageOfAssets = ()=>{
        return assetValues > 0 ? '(100.00%)' : '(0%)'
    }
    const percentageOfLiability = ()=>{
        if(assetValues > 0){
            let percentageOfLiabilityValue = (liabilityValues/assetValues*100).toFixed(2)
            return percentageOfLiabilityValue > 0 ? `(${percentageOfLiabilityValue}%)` : `(0%)`
        }else{
            if(liabilityValues > 0){
                let percentageOfLiabilityValue = 100
                return percentageOfLiabilityValue > 0 ? `(${percentageOfLiabilityValue}%)` : `(0%)`
            }else{
                let percentageOfLiabilityValue = 0
                return percentageOfLiabilityValue > 0 ? `(${percentageOfLiabilityValue}%)` : `(0%)`
            }
            
            
        }   
    }
    const percentageOfNetWealth = ()=>{
        let percentageOfnetWealthValue = (netWealthValue/assetValues*100).toFixed(2)
        return percentageOfnetWealthValue > 0 ? `(${percentageOfnetWealthValue}%)` : `(0%)`
    }
    const percentageOfAssetLiquid = ()=>{
        let percentageOfAssetLiquid = (assetLiquidValue/assetValues*100).toFixed(2)
        return percentageOfAssetLiquid > 0 ? `(${percentageOfAssetLiquid}%)` : `(0%)`
    }
    const percentageOfAssetInvest = ()=>{
        let percentageOfAssetInvest = (assetInvestValue/assetValues*100).toFixed(2)
        return percentageOfAssetInvest > 0 ? `(${percentageOfAssetInvest}%)` : `(0%)`
    }
    const percentageOfAssetPersonal = ()=>{
        let percentageOfAssetPersonal = (assetPersonalValue/assetValues*100).toFixed(2)
        return percentageOfAssetPersonal > 0 ? `(${percentageOfAssetPersonal}%)` : `(0%)`
    }
    const percentageOfLiabilityShort = ()=>{
        if(assetValues > 0){
            let percentageOfLiabilityShort = (liabilityShortValues/assetValues*100).toFixed(2)
            return percentageOfLiabilityShort > 0 ? `(${percentageOfLiabilityShort}%)` : `(0%)`
        }else{
            let percentageOfLiabilityShort = (liabilityShortValues/liabilityValues*100).toFixed(2)
            return percentageOfLiabilityShort > 0 ? `(${percentageOfLiabilityShort}%)` : `(0%)`
        }   
    }
    const percentageOfLiabilityLong = ()=>{
        if(assetValues > 0){
            let percentageOfLiabilityLong = (liabilityLongValues/assetValues*100).toFixed(2)
            return percentageOfLiabilityLong > 0 ? `(${percentageOfLiabilityLong}%)` : `(0%)`
        }else{
            let percentageOfLiabilityLong = (liabilityLongValues/liabilityValues*100).toFixed(2)
            return percentageOfLiabilityLong > 0 ? `(${percentageOfLiabilityLong}%)` : `(0%)`
        }   
    }

    const heightOfAssetLiquid = ()=>{
        return assetLiquidValue/liabilityValues*150
    }
    const heightOfAssetInvest = ()=>{
        return assetInvestValue/liabilityValues*150
    }
    const heightOfAssetPersonal = ()=>{
        return assetPersonalValue/liabilityValues*150
    }
    
    
    const handleSelectedGraph = ()=>{
        setSelectedType('graph')
    }

    const handleSelectedMenuBar = ()=>{
        setSelectedType('menuBar')
    }

    const handleSelectedAsset = ()=>{
        setSelectedDetail('asset')
    }

    const handleSelectedLiability = ()=>{
        setSelectedDetail('liability')
    }

    const handleItemPress = (item) => {
        dispatch(setItemData(item))
        dispatch(setCameFrom("AssetLiabilityDetailScreen"));
        navigation.navigate('DetailScreen');
    };
    const renderItem = ({ item })=>{
        return(
            <TouchableOpacity style={{flex:1, flexDirection:'row', alignItems:'center', marginVertical:5}}
            onPress={() => handleItemPress(item)}>
                <View style={{flex:0.5, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../assets/circle.png')} width={25} height={25}/>
                    <Image source={{uri:item.photoURL}} width={25} height={25} style={{position:'absolute'}}/>
                </View>
                
                <Text style={{flex:2}}>{item.subCategory}</Text>
                <Text style={styles.textValue}>{item.value}</Text>
                <Text style={{paddingHorizontal:5}}>THB</Text>
            </TouchableOpacity>
        )
        
    }

    const renderItemLiabilityRemaining = ({ item })=>{
        return(
            <View style={{flex:1, flexDirection:'row', alignItems:'center', marginVertical:5}}>
                <View style={{flex:0.5, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../assets/circle.png')} width={25} height={25}/>
                    <Image source={{uri:item.photoURL}} width={25} height={25} style={{position:'absolute'}}/>
                </View>
                
                <Text style={{flex:2}}>{item.subCategory}</Text>
                <Text style={styles.textValue}>{item.value}</Text>
                <Text style={{paddingHorizontal:5}}>THB</Text>
            </View>
        )
        
    }
    
    const componentAsset = ()=>{
        return(
            <View style={{paddingLeft:20, marginVertical:10}}>
                <Text style={{marginVertical:5}}>สินทรัพย์สภาพคล่อง</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={assetData.liquid}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <Text style={{marginVertical:5}}>สินทรัพย์ลงทุน</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={assetData.invest}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <Text style={{marginVertical:5}}>สินทรัพย์ส่วนตัว</Text>
                <FlatList
                    data={assetData.personal}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />
            </View>
            
        )
    }

    const handleComponentLiability = ()=>{
        if(selectedDetailLiability == 'All'){
            return(
                componentLiability()
            )
        }
        if(selectedDetailLiability == 'Remaining'){
            return(
                componentLiabilityRemaining()
            )
        }
    }

    const componentLiability = ()=>{
        return(
            <View style={{paddingLeft:20, marginVertical:10}}>
                <Text style={{marginVertical:5}}>หนี้ระยะสั้น</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={liabilityData.short}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <Text style={{marginVertical:5}}>หนี้ระยะยาว</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={liabilityData.long}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />
            </View>
            
        )
    }

    const componentLiabilityRemaining = ()=>{
        return(
            <View style={{paddingLeft:20, marginVertical:10}}>
                <Text style={{marginVertical:5}}>หนี้ระยะสั้น</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={liabilityRemainingData.short}
                    renderItem={renderItemLiabilityRemaining}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />

                <Text style={{marginVertical:5}}>หนี้ระยะยาว</Text>
                <FlatList style={{borderBottomWidth:1}}
                    data={liabilityRemainingData.long}
                    renderItem={renderItemLiabilityRemaining}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />
            </View>
            
        )
    }

    const TextLiabilityRemaining = ()=>{
        return(
            <View style={{flex:2, flexDirection:'row'}}>
                <View style={{flex:0.5}}></View>
                <TouchableOpacity style={{flex:1, backgroundColor:selectedDetailLiability == 'All' ? '#b3d8d8' : '#d9d9d9', borderWidth:1, borderColor:'#ffffff'}}
                    onPress={()=>{
                        setSelectedDetailLiability('All')
                    }}
                >
                    <Text style={{flex:1, color:'#000000', textAlign:'center', textAlignVertical:'center'}}>ทั้งหมด</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex:1, backgroundColor:selectedDetailLiability == 'Remaining' ? '#b3d8d8' : '#d9d9d9', borderTopRightRadius:14, borderWidth:1, borderColor:'#ffffff'}}
                    onPress={()=>{
                        setSelectedDetailLiability('Remaining')
                    }}
                >
                    <Text style={{flex:1, color:'#000000', textAlign:'center', textAlignVertical:'center'}}>คงเหลือ</Text>
                </TouchableOpacity>
            </View>
            
            
        )
    }

    const componentMenuBar = ()=>{
        return(
            <View style={{height:'100%'}}>
                <View style={{height:60, flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1, backgroundColor:selectedDetail == 'asset' ? '#b3d8d8' : '#d9d9d9', justifyContent:'center', alignItems:'center'}}
                        onPress={handleSelectedAsset}
                    >
                        <Text style={{fontWeight:'bold'}}>สินทรัพย์</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, backgroundColor:selectedDetail == 'liability' ? '#b3d8d8' : '#d9d9d9', justifyContent:'center', alignItems:'center'}}
                        onPress={handleSelectedLiability}
                    >
                        <Text style={{fontWeight:'bold'}}>หนี้สิน</Text>
                    </TouchableOpacity>
                </View>
                {selectedDetail == 'asset' ? componentAsset() : handleComponentLiability()}

            </View>
        )
    }
   
    const componentGraph = ()=>{
        //console.log(typeof assetValues);
        return(
            <View style ={{flex:1}}>
                <View style={{flex:1,backgroundColor:"#fffffA",marginTop:25,alignItems:'center', marginHorizontal:25}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'column',width:65,marginHorizontal:20,marginBottom:20}}>
                            <Text style={styles.textHeaderGraph}>สินทรัพย์</Text>
                            <Text style={styles.textHeaderValueGraph}>{assetValues}</Text>
                            <Text style={styles.textHeaderValueGraph}>{percentageOfAssets()}</Text>
                        </View>
                        <View style={{flexDirection:'column',width:65,marginHorizontal:20,marginBottom:20}}>
                            <Text style={styles.textHeaderGraph}>หนี้สิน</Text>
                            <Text style={styles.textHeaderValueGraph}>{liabilityValues}</Text>
                            <Text style={styles.textHeaderValueGraph}>{percentageOfLiability()}</Text>
                        </View>
                        <View style={{flexDirection:'column',width:100,marginBottom:20}}>
                            <Text style={styles.textHeaderGraph}>ความมั่งคั่งสุทธิ</Text>
                            <Text style={styles.textHeaderValueGraph}>{netWealthValue}</Text>
                            <Text style={styles.textHeaderValueGraph}>{percentageOfNetWealth()}</Text>
                        </View>
                    </View>
                   
                    <View style={{flexDirection: 'row',borderBottomColor:'#D2DBD6', marginLeft:(assetValues == 0) && (liabilityValues > 0) ? 130 : 0, width:'100%'}}>
                        <View style={{flexDirection:'column-reverse',marginHorizontal:20}}>
                            
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 &&(
                                <View style={{ height:heightOfAssetPersonal() , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FFFF00" }}>
                                    <Text style={styles.textValueinGraph}>{assetPersonalValue.toLocaleString()}</Text>
                                </View>
                            )}
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 &&(
                                <View style={{ height:heightOfAssetInvest() , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#EEE8AA" }}>
                                    <Text style={styles.textValueinGraph}>{assetInvestValue.toLocaleString()}</Text>
                                </View>
                            )}
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 &&(
                                <View style={{ height:heightOfAssetLiquid() , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FFFACD" }}>
                                    <Text style={styles.textValueinGraph}>{assetLiquidValue.toLocaleString()}</Text>
                                </View>
                            )}
                            {/* กรณีที่ค่า หนี้สิน <= สินทรัพย์ ใช้สเกลเดิม */}
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                <View style={{ height: assetPersonalValue / assetValues * 150, width: 65, flexDirection: 'column', justifyContent: 'flex-end',backgroundColor: "#FFFF00" }}>
                                    <Text style={styles.textValueinGraph}>{assetPersonalValue.toLocaleString()}</Text>
                                </View>
                            )}
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                <View style={{ height: assetInvestValue / assetValues * 150, width: 65, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: "#EEE8AA" }}>
                                    <Text style={styles.textValueinGraph}>{assetInvestValue.toLocaleString()}</Text>
                                </View>
                            )}
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                <View style={{ height: assetLiquidValue / assetValues * 150, width: 65, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: "#FFFACD" }}>
                                    <Text style={styles.textValueinGraph}>{assetLiquidValue.toLocaleString()}</Text>
                                </View>
                            )}
                        </View>
                        
                        
                        <View style={{ flexDirection: 'column-reverse', marginHorizontal: 20 }}>
                            
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                <View style={{ height:liabilityShortValues/assetValues*150 , width: 65,flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF0000" }}>
                                    <Text style={styles.textValueinGraph}>{liabilityShortValues.toLocaleString()}</Text>
                                </View>
                            )}
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 <= 150 && (
                                <View style={{ height:liabilityLongValues/assetValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF8C00" }}>
                                    <Text style={styles.textValueinGraph}>{liabilityLongValues.toLocaleString()}</Text>
                                </View>
                            )}
                            
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 && (
                                <View style={{ height:liabilityShortValues/liabilityValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF0000" }}>
                                    <Text style={styles.textValueinGraph}>{liabilityShortValues.toLocaleString()}</Text>
                                </View>
                            )}
                            {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 && (
                                <View style={{ height:liabilityLongValues/liabilityValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF8C00" }}>
                                    <Text style={styles.textValueinGraph}>{liabilityLongValues.toLocaleString()}</Text>
                                </View>
                            )}

                            {assetValues == 0 && liabilityShortValues + liabilityLongValues > 0 && (
                                <View style={{ height:liabilityShortValues/liabilityValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF0000" }}>
                                    <Text style={styles.textValueinGraph}>{liabilityShortValues.toLocaleString()}</Text>
                                </View>
                            )}
                            {assetValues == 0 && liabilityShortValues + liabilityLongValues > 0 && (
                                <View style={{ height:liabilityLongValues/liabilityValues*150 , width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#FF8C00" }}>
                                    <Text style={styles.textValueinGraph}>{liabilityLongValues.toLocaleString()}</Text>
                                </View>
                            )}
                        </View>
                        
                        
                        {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 < 150 && (
                            <View style={{ flexDirection: 'column-reverse', paddingHorizontal: 17.5 }}>
                                {netWealthValue >= 0 && (
                                    <View style={{ height: netWealthValue/assetValues*150, width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#B3DBD8" }}>
                                        <Text style={styles.textValueinGraph}>{netWealthValue}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                        {liabilityShortValues/assetValues*150 + liabilityLongValues/assetValues*150 > 150 && (
                            <View style={{ flexDirection: 'column-reverse', paddingHorizontal: 50 }}>
                                {netWealthValue >= 0 && (
                                    <View style={{ height: netWealthValue/assetValues*150, width: 65, flexDirection: 'column',justifyContent:'flex-end', backgroundColor: "#B3DBD8" }}>
                                        <Text style={styles.textValueinGraph}>{netWealthValue.toLocaleString()}</Text>
                                    </View>
                                )}
                            </View>
                        )}   
                    </View>
                    {/*sdsdsdsdsdsdsdsdsdsdsdsd */}
                    {/* testsave */}
                    <View style={{borderTopWidth:assetValues == 0 && liabilityValues == 0 ? 0 : 1, width:'100%'}}></View>
                    {netWealthValue < 0 && -netWealthValue/assetValues*150 <= 150 && (
                        <View style={{ flexDirection: 'column-reverse', marginLeft: 210 }}>
                            <View style={{ height: -netWealthValue/liabilityValues*150, width: 65,flexDirection: 'column-reverse',justifyContent:'flex-end', backgroundColor: "#B3DBD8" }}>
                                <Text style={styles.textValueinGraph}>{netWealthValue.toLocaleString()}</Text>
                            </View>
                        </View>
                    )}
                    {netWealthValue < 0 && -netWealthValue/assetValues*150 > 150 && (
                        <View style={{ flexDirection: 'column-reverse',paddingHorizontal:50,marginLeft: 210 }}>
                            <View style={{ height: -netWealthValue/liabilityValues*150, width: 65, flexDirection: 'column-reverse',justifyContent:'flex-end', backgroundColor: "#B3DBD8" }}>
                                <Text style={styles.textValueinGraph}>{netWealthValue.toLocaleString()}</Text>
                            </View>
                        </View>
                    )}
                </View>
                <View style={{flex:0.5,marginTop:120,flexDirection:'row',justifyContent:'center'}}>
                    <View style={{flex:0.25,flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}>
                        <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#FFFACD'}}></View>
                        <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#EEE8AA'}}></View>
                        <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#FFFF00'}}></View>
                    </View>

                    <View style={{flexflexDirection: 'column',justifyContent:'center',marginHorizontal:8}}>
                        <Text style={styles.textDetail}>สินทรัพย์สภาพคล่อง {percentageOfAssetLiquid()}</Text>
                        <Text style={styles.textDetail}>สินทรัพย์ลงทุน {percentageOfAssetInvest()}</Text>
                        <Text style={styles.textDetail}>สินทรัพยส่วนตัว {percentageOfAssetPersonal()}</Text>
                    </View>
                    <View style={{flex:0.25,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
                        <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#FF0000'}}></View>
                        <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#FF8C00'}}></View>
                        <View style={{width: 15,height: 15,borderRadius:15,marginBottom:15,backgroundColor: '#B3DBD8'}}></View>
                    </View>
                    <View style={{flexDirection: 'column',justifyContent:'center',marginHorizontal:8}}>
                        <Text style={styles.textDetail}>หนี้สินระยะสั้น {percentageOfLiabilityShort()}</Text>
                        <Text style={styles.textDetail}>หนี้สินระยะยาว {percentageOfLiabilityLong()}</Text>
                        <Text style={styles.textDetail}>ความมั่งคั่งสุทธิ {percentageOfNetWealth()}</Text>
                    </View>
                </View> 
            </View>
        )
    }

    return(
        <ScrollView style={{backgroundColor:'#fffffa'}}>
            <View style={{height:140, borderWidth:1, borderColor:'#000000', borderRadius:16, marginVertical:30, marginHorizontal:40, backgroundColor:'#ffffff'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', paddingHorizontal:10, paddingTop:10}}>
                    <Text style={styles.headerText}>ความมั่งคั่งสุทธิ</Text>
                    <Text style={[styles.bodyText,{flex:1, textAlign:'right'}]}>ข้อมูล ณ ปัจจุบัน</Text>
                </View>

                <View style={{flex:1, paddingLeft:10, paddingTop:5}}>
                    <Text style={{flex:1, color:'#0ABAB5', fontFamily:'ZenOldMincho-Black', fontSize:16}}>{netWealthValue} THB</Text>
                </View>

                <View style={{flex:1.2, flexDirection:'row', paddingHorizontal:10}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={styles.subHeaderText}>สินทรัพย์รวม</Text>
                        <Text style={styles.subHeaderText}>{assetValues} THB</Text>
                    </View>

                    <View style={{flex:1, flexDirection:'column', paddingLeft:10, borderLeftWidth:1, borderColor:'#D2DBD6'}}>
                        <Text style={styles.subHeaderText}>หนี้สินรวม</Text>
                        <Text style={styles.subHeaderText}>{liabilityValues} THB</Text>
                    </View>
                </View>
                
                
            </View>

            <View style={{height:selectedType == 'graph' && netWealthValue >= 0 ? 470 : (selectedType === 'graph' && netWealthValue < 0 && -netWealthValue/assetValues*150 <= 150  ? 470+(-netWealthValue/liabilityValues*150):(selectedType === 'graph' && netWealthValue < 0 && -netWealthValue/liabilityValues*150 <=  150  ? 470+(-netWealthValue/liabilityValues*150):(selectedDetail == 'asset' ? assetContainerHeight : (selectedDetailLiability == 'All' ? liabilityContainerHeight : liabilityRemainingContainerHeight)))), borderWidth:2, borderColor:'#a9a9a9', marginHorizontal:15, borderRadius:16, backgroundColor:'#ffffff'}}>
                <View style={{height:55}}>
                    <View style={{flex:1, flexDirection:'row',borderBottomWidth:1,borderColor:"#D2DBD6",borderBottomStartRadius:10,borderBottomEndRadius:10}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <TouchableOpacity style={{width:35, height:35, justifyContent:'center', alignItems:'center', margin:10}}
                                onPress={handleSelectedGraph}
                            >
                                {selectedType == 'graph' ? 
                                    <Image source={require('../../assets/circleGreen.png')} width={35} height={35}/> 
                                    :
                                    <Image source={require('../../assets/circle.png')} width={35} height={35}/>
                                }
                                <Image source={require('../../assets/barChartIcon.png')} width={30} height={30} style={{position:'absolute'}}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:35, height:35, justifyContent:'center', alignItems:'center', margin:10}}
                                onPress={handleSelectedMenuBar}
                            >
                                {selectedType == 'menuBar' ? 
                                    <Image source={require('../../assets/circleGreen.png')} width={35} height={35}/> 
                                    :
                                    <Image source={require('../../assets/circle.png')} width={35} height={35}/>
                                }
                                <Image source={require('../../assets/menuBarIcon.png')} width={30} height={30} style={{position:'absolute'}} />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, flexDirection:'column'}}>
                            { selectedType == 'menuBar' && selectedDetail == 'liability'  ? TextLiabilityRemaining() : <View></View>}
                            <Text style={{flex:1, textAlignVertical:'bottom', textAlign:'right', marginRight:10}}>ข้อมูล ณ วันที่ 03-02-2024</Text>
                        </View>
                    </View>
                    
                </View>
                
                { selectedType == 'graph'? componentGraph() : componentMenuBar()}
                                
            </View>
        </ScrollView>
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
        fontSize:13,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:13,
        color:'#000000'
    },

    textValue:{
        flex:1,
        fontFamily:'ZenOldMincho-Regular',
        fontSize:13,
        color:'#0abab5',
        textAlign:'right'
    },
    textValueinGraph:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:10,
        color:'#000000',
        textAlign:'center',
        marginBottom:2
    },
    textHeaderGraph:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:15,
        color:'#000000',
        textAlign:'center',
        marginBottom:10
    },
    textHeaderValueGraph:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:12,
        color:'#000000',
        textAlign:'center',
        marginBottom:10
    },
    textDetail:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:11,
        color:'#000000',
        marginBottom:15,
        lineHeight: 15
    }
})