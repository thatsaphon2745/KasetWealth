import { View,TouchableOpacity,Image,Text, FlatList, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { setIsUpdate } from "../../redux/variableSlice";
import { addItem2Inventory, checkDuplicateItem, retrieveCurrencyPet, addFurniture2Inventory, 
    updateMoneyBalance, updateRubyBalance, updateGuarantee, addPetImages, addOnePetImage} from "../../firebase/UserModel";
import { retrieveInventory } from "../../firebase/RetrieveData";

export const PetShopScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auths);
    const userUID = user[0].uid;
    const isUpdate = useSelector((state)=>state.variables.isUpdate);
    const [coinBalance, setCoinBalance] = useState();//แทนด้วยเงินทั้งหมด user
    const [rubyBalance, setRubyBalance] = useState();//แทนด้วยเพชรทั้งหมด user
    const [mysteryBoxGuaranteeNormal, setmysteryBoxGuaranteeNormal] = useState();
    const [inventory, setInventory] = useState();
    const [modalChangePetCardVisible, setModalChangePetCardVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [modalInfoForUseVisible, setModalInfoForUseVisible] = useState(false);
    const [modalPurchasedIncomplete, setModalPurchasedIncomplete] = useState(false);
    const [modalPurchasedComplete, setModalPurchasedComplete] = useState(false);
    const [modalRandomCoin, setModalRandomCoin] = useState(false);
    const [modalGuaranteCoin, setModalGuaranteCoin] = useState(false);
    const [modalInsufficientCoins, setModalInsufficientCoins] = useState(false);
    const [modalInsufficientRubies, setModalInsufficientRubies] = useState(false);
    const [modalOneItemInInventory, setModalOneItemInInventory] = useState(false);
    const [modalDuplicateItem, setModalDuplicateItem] = useState(false);
    const [newPetImage, setNewPetImage] = useState(null);
    const [randomCoinValue, setRandomCoinValue] = useState(null);

    useEffect(() => {
        retrieveCurrency();
        handleRetriveInventory()
    }, [coinBalance,rubyBalance,isUpdate]);

    const handleRetriveInventory = async () => {
        const data = await retrieveInventory(userUID);
        setInventory(data);
    }

    //ดึงข้อมูล currency และ เลขการันตี
    const retrieveCurrency = async () => {
        try {
            const currencyData = await retrieveCurrencyPet(userUID);
            if (currencyData) {
                setCoinBalance(currencyData.Money);
                setRubyBalance(currencyData.Ruby);
                setmysteryBoxGuaranteeNormal(currencyData.Guarantee)
            } else {
                console.log("No currency data found.");
            }
        } catch (error) {
            console.error("Error retrieving currency data:", error);
        }
    };

    //รายละเอียดการซื้อและคำนวนเงินและเพชร
    const reportBuyItem = (item) => {
        if (item.itemType === 'กล่องสุ่ม') {
            if (item.itemName === 'CardBoard') {
                if (mysteryBoxGuaranteeNormal === 1) {
                    const newRubyBalance = rubyBalance - item.itemPrice;
                    const updatedMysteryBoxCount = item.itemGuarantee;
                    const newRandomMoney = randomMoney(item);
                    const newCoinBalance = coinBalance + newRandomMoney;
                    // อัปเดตยอดเงินใน Firebase และ เลขการันตี
                    setRubyBalance(newRubyBalance);
                    setmysteryBoxGuaranteeNormal(updatedMysteryBoxCount);
                    updateGuarantee(userUID, updatedMysteryBoxCount)
                    setRandomCoinValue(newRandomMoney)
                    updateRubyBalance(userUID, newRubyBalance)
                        .catch((error) => {
                            console.error("Error updating ruby balance:", error);
                            togglePurchasedIncomplete();
                            // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                            setRubyBalance(rubyBalance);
                    })
                    setCoinBalance(newCoinBalance);
                    updateMoneyBalance(userUID, newCoinBalance)
                        .then(() => {
                            console.log(`Item Purchased: ${item.itemName}`);
                            toggleGuaranteCoin();
                        })
                        .catch((error) => {
                            console.error("Error updating money balance:", error);
                            togglePurchasedIncomplete();
                            // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                            setCoinBalance(coinBalance);
                        })
                }else {
                    if (item.itemCurrencyType === 'coin') {
                        if (coinBalance >= item.itemPrice) {
                            const newCoinBalance = coinBalance - item.itemPrice;
                            const updatedMysteryBoxCount = mysteryBoxGuaranteeNormal - 1;
                            const newRandomMoney = randomMoney(item);
                            const newCoinBalance1 = newCoinBalance + newRandomMoney;
                    
                            // อัปเดตยอดเงินและจำนวนกล่องลับใน Firebase
                            setCoinBalance(newCoinBalance);
                            setmysteryBoxGuaranteeNormal(updatedMysteryBoxCount);
                            setCoinBalance(newCoinBalance1);
                            setRandomCoinValue(newRandomMoney);
                            updateMoneyBalance(userUID, newCoinBalance1)
                                .then(() => {
                                    console.log(`Item Purchased: ${item.itemName}`);
                                    toggleRandomCoin();
                                })
                                .catch((error) => {
                                console.error("Error updating money balance:", error);
                                togglePurchasedIncomplete();
                                // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                setCoinBalance(coinBalance);
                            })
                            updateGuarantee(userUID, updatedMysteryBoxCount);
                        } else {
                            console.log('Insufficient coins to buy this item');
                            toggleInsufficientCoins();
                        }
                    }else if (item.itemCurrencyType === 'ruby') {
                        if (rubyBalance >= item.itemPrice) {
                            const newRubyBalance = rubyBalance - item.itemPrice;
                            const updatedMysteryBoxCount = mysteryBoxGuaranteeNormal - 1;
                            const newRandomMoney = randomMoney(item);
                            const newCoinBalance = coinBalance + newRandomMoney;

                            // อัปเดตยอดเงินใน Firebase และ เลขการันตี
                            setRubyBalance(newRubyBalance);
                            setmysteryBoxGuaranteeNormal(updatedMysteryBoxCount);
                            updateGuarantee(userUID, updatedMysteryBoxCount);
                            setRandomCoinValue(newRandomMoney);
                            updateRubyBalance(userUID, newRubyBalance)
                                .catch((error) => {
                                    console.error("Error updating ruby balance:", error);
                                    togglePurchasedIncomplete();
                                    // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                                    setRubyBalance(rubyBalance);
                            });
                            setCoinBalance(newCoinBalance);
                            updateMoneyBalance(userUID, newCoinBalance)
                                .then(() => {
                                    console.log(`Item Purchased: ${item.itemName}`);
                                    toggleRandomCoin();
                                })
                                .catch((error) => {
                                    console.error("Error updating money balance:", error);
                                    togglePurchasedIncomplete();
                                    // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                    setCoinBalance(coinBalance);
                                });
                        } else {
                            console.log('Insufficient rubies to buy this item');
                            toggleInsufficientRubies();
                        }
                    }   
                }
            }
        } else {
            if (item.itemName === 'บัตรเปลี่ยนสัตว์เลี้ยง') {
                if (item.itemCurrencyType === 'coin') {
                    if (coinBalance >= item.itemPrice) {
                        const newCoinBalance = coinBalance - item.itemPrice;
                        setCoinBalance(newCoinBalance);//ในแอป
                        updateMoneyBalance(userUID, newCoinBalance)//ในฐานข้อมูล
                            .then(() => {
                                console.log(`Item itemPurchesed: ${item.itemName}`);
                                console.log('Purchased Complete!');
                            })
                            .catch((error) => {
                                console.error("Error updating money balance:", error);
                                console.log('Purchased Incomplete!');
                                togglePurchasedIncomplete();
                                // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                setCoinBalance(coinBalance);
                            });
                    } else {
                        console.log('Insufficient coins to buy this item');
                        toggleInsufficientCoins();
                    }
                } else if (item.itemCurrencyType === 'ruby') {
                    if (rubyBalance >= item.itemPrice) {
                        const newRubyBalance = rubyBalance - item.itemPrice;
                        setRubyBalance(newRubyBalance);
                        updateRubyBalance(userUID, newRubyBalance)
                            .then(() => {
                                console.log(`Item itemPurchesed: ${item.itemName}`);
                                console.log('Purchased Complete!');
                            })
                        .catch((error) => {
                            console.error("Error updating ruby balance:", error);
                            console.log('Purchased Incomplete!');
                            togglePurchasedIncomplete();
                            // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                            setRubyBalance(rubyBalance);
                        })
                    } else {
                        console.log('Insufficient rubies to buy this item');
                        toggleInsufficientRubies();
                    }
                }
            }else{
                if (item.itemCurrencyType === 'coin') {
                    if (coinBalance >= item.itemPrice) {
                        const newCoinBalance = coinBalance - item.itemPrice;
                        setCoinBalance(newCoinBalance);//ในแอป
                        updateMoneyBalance(userUID, newCoinBalance)//ในฐานข้อมูล
                            .then(() => {
                                console.log(`Item itemPurchesed: ${item.itemName}`);
                                console.log('Purchased Complete!');
                                togglePurchasedComplete();
                            })
                            .catch((error) => {
                                console.error("Error updating money balance:", error);
                                console.log('Purchased Incomplete!');
                                togglePurchasedIncomplete();
                                // คืนค่าเงินกลับไปเป็นเงินเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตเงิน
                                setCoinBalance(coinBalance);
                            });
                    } else {
                        console.log('Insufficient coins to buy this item');
                        console.log('Purchased Incomplete!\nInsufficient coins to buy this item');
                        toggleInsufficientCoins();
                    }
                } else if (item.itemCurrencyType === 'ruby') {
                    if (rubyBalance >= item.itemPrice) {
                        const newRubyBalance = rubyBalance - item.itemPrice;
                        setRubyBalance(newRubyBalance);
                        updateRubyBalance(userUID, newRubyBalance)
                            .then(() => {
                                console.log(`Item itemPurchesed: ${item.itemName}`);
                                console.log('Purchased Complete!');
                                togglePurchasedComplete();
                            })
                        .catch((error) => {
                            console.error("Error updating ruby balance:", error);
                            console.log('Purchased Incomplete!');
                            togglePurchasedIncomplete();
                            // คืนค่าเพชรกลับไปเป็นค่าเดิมเนื่องจากมีข้อผิดพลาดในการอัปเดตค่า
                            setRubyBalance(rubyBalance);
                        })
                    } else {
                        console.log('Insufficient rubies to buy this item');
                        console.log('Purchased Incomplete !\nbecause Insufficient rubies to buy this item');
                        toggleInsufficientRubies();
                    }
                }
            }
        }
    };
    
    //ส่งประเภทไอเทมกดใช้ไป inventory
    const buyItem2Inventory = (item) => {
        addItem2Inventory(userUID,item)
            .then(()=>{
                dispatch(setIsUpdate(!isUpdate))
            })
    }

    //ส่งประเภทไอเทมของตกแต่งไป inventory
    const buyFur2Inventory = (item) => {
        addFurniture2Inventory(userUID,item)
            .then(()=>{
                dispatch(setIsUpdate(!isUpdate))
            })
    }

    //เปลี่ยนเลขรับประกันเงิน
    const changeGuarantee = (item) => {
        if (item.itemName === 'CardBoard') {
            return mysteryBoxGuaranteeNormal
        }
    }
    
    //ข้อความรายละเอียดการสุ่ม
    const toggleRandomInfo = () => {
        setModalInfoVisible(!modalInfoVisible);
    }

    //ข้อความรายละเอียดของไอเทมกดใช้
    const toggleInfoForUse = () => {
        setModalInfoForUseVisible(!modalInfoForUseVisible)
    }

    //สุ่มเงินขั้นต่ำ 100 สูงสุด 1000 การันตี 1000
    const randomMoney = (item) => {
        let randomAmount;
            if (mysteryBoxGuaranteeNormal === 1) {
                randomAmount = 1000;
            }else{
                // สุ่มตัวเลขในช่วง 100 ถึง 1000
                randomAmount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
            }
        return randomAmount;
    }

    const toggleModalChangePetCardVisible = () => {
        setModalChangePetCardVisible(!modalChangePetCardVisible);
    };

    const togglePurchasedIncomplete = () => {
        setModalPurchasedIncomplete(!modalPurchasedIncomplete);
    }

    const togglePurchasedComplete = () => {
        setModalPurchasedComplete(!modalPurchasedComplete);
    }

    const toggleRandomCoin = () => {
        setModalRandomCoin(!modalRandomCoin);
    }

    const toggleGuaranteCoin = () => {
        setModalGuaranteCoin(!modalGuaranteCoin);
    }

    const toggleInsufficientCoins = () => {
        setModalInsufficientCoins(!modalInsufficientCoins);
    }

    const toggleInsufficientRubies = () => {
        setModalInsufficientRubies(!modalInsufficientRubies);
    }

    const toggle1stItemInInventory = () => {
        setModalOneItemInInventory(!modalOneItemInInventory);
    }

    const toggleDuplicateItem = () => {
        setModalDuplicateItem(!modalDuplicateItem);
    }

    const randomPetCard = async () => { //บัตรสุ่มสัตว์เลี้ยง
        const allPetImages = [
            [
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213005263385268264/Bear04-01.png?ex=660f95af&is=65fd20af&hm=88aed8e10d441173a2ab9a0c5ce3e49bf513d1750f958f2b85823704cd553ad4&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213005263146061875/Bear04-02.png?ex=660f95af&is=65fd20af&hm=3d71ed70ac03028973897dfa3ac85c65dae6b6f465999f5b4ab2634de5ecc019&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213005263611887656/Bear04-03.png?ex=660f95af&is=65fd20af&hm=9ec7f3cd612068017f8336817197d376199657567cb82b41fbfd64e066fca326&"
            ],
            [
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213005356423319572/Cat01-1.png?ex=660f95c5&is=65fd20c5&hm=a10d9512efcfbaa24503758a3e2a5ed371a5c6125c499e3d5a8aa6d5c682e467&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213005356158943252/Cat01-2.png?ex=660f95c5&is=65fd20c5&hm=31befe5afd06708706837b8ad4954e9eccf8a4d247853ce3f883213439bfc8ec&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213005356666720307/Cat01-3.png?ex=660f95c5&is=65fd20c5&hm=0b6c965f50ee6206a791f123ed239da1b46f56eb343f2152c5cab79f3414d12c&"
            ],
            [
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213006044624592916/Devil03-01.png?ex=660f9669&is=65fd2169&hm=712d911aeb4ca4ece77834000f1377cd0adca38a2868adbfb8685a6f8e84f8af&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213006044335177728/Devil03-02.png?ex=660f9669&is=65fd2169&hm=85337542817c8ff8d7d2f9b28219a5515c61c00040764e321a77816fd5b8843b&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213006534389272617/Devil03-03.png?ex=660f96de&is=65fd21de&hm=4dad23e13bba7be8648cd8f99ecac0ae8a95d36419c3aca475fc98e390d93c0e&"
            ],
            [
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213006534766764073/Pengu02-01.png?ex=660f96de&is=65fd21de&hm=0f25d067fbf4e8e5781f194a5514f3617b135f23454b907e409aa228731557d4&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213006535089717319/Pengu02-02.png?ex=660f96de&is=65fd21de&hm=e81cd083c3dcdd9ab89cfea69ce3676cad7fcbf197c5a5ea8bed2e580e8597c9&",
                "https://cdn.discordapp.com/attachments/1202281623585034250/1213006535509409812/Pengu02-03.png?ex=660f96de&is=65fd21de&hm=122d7a17c8526fbb321c0724f5d3f55aff330efbd5a5ceeadad164dfcb4400a7&"
            ],
        ];
        
        const randomIndex = Math.floor(Math.random() * allPetImages.length);
        const selectedPetImages = allPetImages[randomIndex];
        addPetImages(userUID, selectedPetImages);
        addOnePetImage(userUID, selectedPetImages[0])
        setNewPetImage(selectedPetImages[0]);
        console.log(newPetImage);
        toggleModalChangePetCardVisible();
        dispatch(setIsUpdate(!isUpdate));
    };

    const renderItem = ({ item, index }) => {
        let renderStyle;
        let isDuplicateURL = false;
        if (inventory && inventory.all) {
            isDuplicateURL = inventory.all.find(element => element.itemName === item.itemName) !== undefined;
        }else{
            isDuplicateURL = false
        }
        console.log(isDuplicateURL);
        if (item.itemType === 'กล่องสุ่ม') {
            renderStyle = (
                <View style={mysteryStyles.viewTouchableBoxCategoryMysteryBox}>
                    <View 
                        style={mysteryStyles.view136}>
                        <View style={mysteryStyles.viewImage}>
                            <Image
                                style={mysteryStyles.imageItemBox}
                                source={{uri: item.itemPhotoURL}}
                                width={120}
                                height={120}
                            />
                        </View>
                        <View style={mysteryStyles.viewGuarantee}>
                            <Text style={mysteryStyles.textGuaranteeDetaill}>เปิดอีก {changeGuarantee(item)} กล่องเพื่อรับตำนาน</Text>
                        </View>
                    </View>
                    <View style={mysteryStyles.view164}>
                        <View style={mysteryStyles.viewTextTopic}>
                            <Text style={mysteryStyles.textTopic}>MysteryBox กล่องปริศนา</Text>
                        </View>
                        <View style={mysteryStyles.viewDetaillTextTopic}>
                                <Text style={styles.textDetailTopic}>เปิดกล่องปริศนาเพื่อลุ้นรับเหรียญ</Text>
                            </View>
                        <View style={mysteryStyles.viewTouchableOpacity}>
                            <View style={mysteryStyles.viewPriceButton}>
                                <TouchableOpacity
                                    style={mysteryStyles.touchableMysteryItemBox}
                                    onPress={() => {
                                        reportBuyItem(item);
                                    }}
                                >
                                    <View style={mysteryStyles.viewTextPriceButton}>
                                        <Text style={mysteryStyles.textDetaillMysteryStyle}>เปิด {item.itemPrice}</Text>
                                        <Image
                                            source={{
                                                uri: item.itemCurrencyType === 'coin'
                                                    ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&'
                                                    : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&'
                                            }}
                                            width={15}
                                            height={15}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={mysteryStyles.viewResetTime}>
                            <View style={mysteryStyles.viewResetTimeText}>
                                <TouchableOpacity
                                    onPress={() =>{
                                        toggleRandomInfo()
                                    }}
                                >
                                    <Text style={mysteryStyles.textDetaillMysteryStyle}>รายละเอียดเพิ่มเติมคลิก</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>{
                                        toggleRandomInfo()
                                    }}
                                >
                                    <Image
                                        source={{uri:'https://cdn.discordapp.com/attachments/1202281623585034250/1213008042174586880/Vector.png?ex=65f3e8c5&is=65e173c5&hm=d1cecd3133b7e415b7dc3576772dcc0c9e2dec7463734ea748e35175a20f47c6&'}}
                                        width={13}
                                        height={13}
                                    />
                                </TouchableOpacity>
                                <View stryle={{}}>
                                    <Text style={mysteryStyles.textDetaillMysteryStyle}>   Page {index + 1}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
            </View>
            )
        } else if (item.itemType === 'forUse') {
           renderStyle = (
                <View style={styles.ViewTouchableBoxCategoryHealthy}>
                    <TouchableOpacity
                        style={styles.TouchableItemBox} 
                        onPress={() => {
                            if (rubyBalance >= item.itemPrice) {
                                if (item.itemName === 'บัตรกันลดขั้น') {
                                    checkDuplicateItem(userUID, item)
                                    .then(isDuplicate => {
                                        // console.log('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                        // alert('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                        if (!isDuplicate) {
                                            // console.log('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                            // alert('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                            reportBuyItem(item);
                                            buyItem2Inventory(item);
                                        } else {
                                            console.log('ไอเทมชิ้นนี้อนุญาติให้มีแค่ 1 ชิ้นใน Inventory เท่านั้น');
                                            toggle1stItemInInventory();
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error checking duplicate item:', error);
                                        // ทำการจัดการข้อผิดพลาดที่เกิดขึ้น
                                    });
                                }else{
                                    reportBuyItem(item)
                                    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                                    randomPetCard();
                                    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
                                }
                            }else{
                                if (item.itemCurrencyType === 'ruby') {
                                    console.log('Insufficient rubies to buy this item');
                                    toggleInsufficientRubies();
                                }else{
                                    console.log('Insufficient coins to buy this item');
                                    toggleInsufficientRubies();
                                }
                            }
                        }}
                    >
                        <View style={styles.viewImageAndNameItemBox}>
                            <View style={styles.viewImageItemBox}>
                                <Image
                                    style={styles.ImageItemBox}
                                    source={{ uri: item.itemPhotoURL }}
                                    width={40}
                                    height={40}
                                />
                            </View>
                            <View style={styles.itemName}>
                                <Text style={styles.textStyleItem}>{item.itemName} </Text>{/*<Text style={styles.textStyleItem}>{item.itemName}</Text>*/}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemPrice}>
                        <Text>{item.itemPrice}</Text>
                        <Image
                            source={{
                                uri: item.itemCurrencyType === 'coin'
                                    ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&'
                                    : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&'
                            }}
                            width={14}
                            height={14}
                        />
                    </View>
                </View>
           )
        } else {
            renderStyle = (
                <View style={styles.ViewTouchableBoxCategoryFurniture}>
                    <TouchableOpacity
                        style={styles.TouchableItemBox}
                        onPress={() => {
                            if (coinBalance >= item.itemPrice) {
                                checkDuplicateItem(userUID, item)
                                .then(isDuplicate => {
                                    // console.log('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                    // alert('สถานะของ isDuplicate คือ: ' + isDuplicate);
                                    if (!isDuplicate) {
                                        // console.log('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                        // alert('สถานะของ checkDuplicateItem คือ: ' + isDuplicate);
                                        buyFur2Inventory(item);
                                        reportBuyItem(item);
                                    } else {
                                        console.log('คุณมีไอเทมชิ้นนี้ใน Inventory แล้ว ไม่สามารถซื้อสินค้าซ้ำได้');
                                        toggleDuplicateItem();
                                    }
                                })
                                .catch(error => {
                                    console.error('Error checking duplicate on press item:', error);
                                    // ทำการจัดการข้อผิดพลาดที่เกิดขึ้น
                                });
                            }else{
                                if (item.itemCurrencyType === 'coin') {
                                    console.log('Insufficient coins to buy this item');
                                    toggleInsufficientRubies();
                                }else{
                                    console.log('Insufficient rubies to buy this item');
                                    toggleInsufficientRubies();
                                }
                            }
                        }}
                    >
                        <View style={styles.viewImageAndNameItemBox}>
                            <View style={styles.viewImageItemBox}>
                                <Image
                                    style={styles.ImageItemBox}
                                    source={{
                                        uri: isDuplicateURL === true
                                            ? item.itemSoldoutURL
                                            : item.itemPhotoURL
                                    }}
                                    width={150}
                                    height={150}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.itemName}>
                                <Text style={styles.textStyleItem}>{item.itemName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemPrice}>
                        <Text>{item.itemPrice}</Text>
                        <Image
                            source={{
                                uri: item.itemCurrencyType === 'coin'
                                    ? 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&'
                                    : 'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&'
                            }}
                            width={14}
                            height={14}
                        />
                    </View>
                </View>
            );
        }

        return renderStyle;
    };

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#2C6264'}}>
            <View style={{height:'100%',padding:5}}>
                <View style={{flex:0.6,marginHorizontal:19}}>
                    <View style={{flex:1}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:0.2}}>
                                <View style={styles.Emptybox}></View>
                            </View>
                            <View style={{flex:0.2}}>
                                <View style={styles.Emptybox}></View>
                            </View>
                                <View style={{flex:0.2}}>
                            <View style={styles.Emptybox}></View>
                            </View>
                            <View style={{flex:0.3,marginRight:4}}>
                                <View style={styles.Currencybox}>
                                    <Image source={{
                                        uri:'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501626617856/Dollar_Coin.png?ex=65db6c77&is=65c8f777&hm=a72f70bdba7584048fdfd739bb0d289c5a47b48c1614e5fd75ed3083f44c3dfa&'}}
                                        width={22}
                                        height={22}
                                    />
                                    <Text style={styles.CurrencyText}>{coinBalance}</Text>
                                </View>
                            </View>
                            <View style={{flex:0.3}}>
                            <View style={styles.Currencybox}>
                                    <Image source={{
                                        uri:'https://cdn.discordapp.com/attachments/1202281623585034250/1206277501387538524/Diamond.png?ex=65db6c77&is=65c8f777&hm=20833581ffe174c0c908177a5224439ae4146c9faceda2d6cae45c06b995b423&'}}
                                        width={22}
                                        height={22}
                                    />
                                    <Text styl={styles.CurrencyText}>{rubyBalance}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.4}}></View>
                    </View>
                </View>
                <View style={{flex:3, marginVertical:5}}>
                <View style={styles.box}>
                        <View style={{flex:3}}>
                            <FlatList
                                data={itemsMysteryBox}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:2, marginVertical:5}}>
                <View style={styles.box}>
                    <View style={{flexDirection:'row',backgroundColor:'#0ABAB5', borderRadius:14}}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>ไอเทมกดใช้</Text>
                        </View>
                        <View>
                                        <TouchableOpacity
                                            onPress={toggleInfoForUse}
                                        >
                                            <Image
                                                style={{
                                                width:20,
                                                height:20,
                                                }}
                                                source={{
                                                    uri: 'https://cdn.discordapp.com/attachments/1202281623585034250/1223147271349207060/material-symbols_info-outline.png?ex=6618cbaa&is=660656aa&hm=b470b6ad93747529febdb8740923d079987e0134bf0f1539700df42b8dfb5274&'
                                                }}
                                        />
                                        </TouchableOpacity>
                                    </View>
                        </View>
                        <View style={{flex:4,alignItems: 'center'}}>
                            <FlatList
                                data={UseItem}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:4, marginVertical:5}}>
                    <View style={styles.box}>
                        <View style={styles.boxhead}>
                            <Text style={styles.headerText}>ของตกแต่ง</Text>
                        </View>
                        <View style={{flex:8}}>
                            <FlatList
                                data={ItemsFurniture}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                
            </View>
            {/*modalChangePetCardVisible */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalChangePetCardVisible}
                onRequestClose={() => {
                    toggleModalChangePetCardVisible();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Change Pet card has been used.</Text>
                        <Text>Your new pet is.</Text>
                        {newPetImage ? ( // เช็คว่า newPetImage มีค่าหรือไม่
                            <View>
                                <Image
                                    source={{
                                        uri: newPetImage
                                    }}
                                    style={{ width: 200, height: 200 }}
                                />
                            </View>
                        ) : (
                            <Text>Loading...</Text>
                        )}
                        <TouchableOpacity onPress={toggleModalChangePetCardVisible} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalInfoVisible */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalInfoVisible}
                onRequestClose={() => {
                    toggleRandomInfo();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>การสุ่มเหรียญจะสุ่มระหว่าง 100 ถึง 1,000 เหรียญ</Text>
                        <Text>เมื่อเปิดจนครบการันตีจะได้เหรียญจำนวน 1,000 เหรียญแน่นอน</Text>
                        <TouchableOpacity onPress={toggleRandomInfo} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalInfoForUseVisible */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalInfoForUseVisible}
                onRequestClose={() => {
                    toggleInfoForUse();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>บัตรกันลดขั้น สามารถป้องกันไม่ให้สัตว์เลี้ยงวิวัฒนาการย้อนกลับได้หนึ่งครั้ง เมื่อซื้อแล้วจะถูกเก็บอยู่ในช่องเก็บของ และจะมีได้เพียงชิ้นเดียวในช่องเก็บของเท่านั้น จะซื้อใหม่ได้ก็ต่อเมื่อบัตรถูกใช้แล้ว บัตรจะถูกใช้อัตโนมัติเมื่อเข้าเงื่อนไข</Text>
                        <Text></Text>
                        <Text>บัตรเปลี่ยนสัตว์เลี้ยง เมื่อซื้อจะสุ่มสัตว์เลี้ยงปัจุบันเป็นร่างแรกของสัตว์เลี้ยงที่สุ่มได้ โปรดเข้าใจด้วยว่ามีความเสี่ยงที่จะสุ่มได้สัตว์เลี้ยงปัจจุบัน</Text>
                        <TouchableOpacity onPress={toggleInfoForUse} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalPurchasedComplete */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalPurchasedComplete}
                onRequestClose={() => {
                    togglePurchasedComplete();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Complete!</Text>
                        <TouchableOpacity onPress={togglePurchasedComplete} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalPurchasedIncomplete */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalPurchasedIncomplete}
                onRequestClose={() => {
                    togglePurchasedIncomplete();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Incomplete!</Text>
                        <TouchableOpacity onPress={togglePurchasedIncomplete} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalRandomCoin */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalRandomCoin}
                onRequestClose={() => {
                    toggleRandomCoin();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Complete!</Text>
                        <Text>จำนวนเงินที่สุ่มได้คือ: {randomCoinValue}</Text>
                        <TouchableOpacity onPress={toggleRandomCoin} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalGuaranteCoin */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalGuaranteCoin}
                onRequestClose={() => {
                    toggleGuaranteCoin();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Congratulations!</Text>
                        <Text>จำนวนเงินที่สุ่มได้คือ: {randomCoinValue}</Text>
                        <TouchableOpacity onPress={toggleGuaranteCoin} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalInsufficientCoins */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalInsufficientCoins}
                onRequestClose={() => {
                    toggleInsufficientCoins();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Incomplete!</Text>
                        <Text>Insufficient coins to buy this item</Text>
                        <TouchableOpacity onPress={toggleInsufficientCoins} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalInsufficientRubies */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalInsufficientRubies}
                onRequestClose={() => {
                    toggleInsufficientRubies();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>Purchased Incomplete!</Text>
                        <Text>because Insufficient rubies to buy this item</Text>
                        <TouchableOpacity onPress={toggleInsufficientRubies} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalOneItemInInventory */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalOneItemInInventory}
                onRequestClose={() => {
                    toggle1stItemInInventory();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>ไอเทมชิ้นนี้อนุญาติให้มีแค่ 1 ชิ้น</Text>
                        <Text>ใน Inventory เท่านั้น</Text>
                        <TouchableOpacity onPress={toggle1stItemInInventory} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*modalDuplicateItem */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDuplicateItem}
                onRequestClose={() => {
                    toggleDuplicateItem();
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                        <Text>คุณมีไอเทมชิ้นนี้ใน Inventory แล้ว</Text>
                        <Text>ไม่สามารถซื้อไอเทมซ้ำได้</Text>
                        <TouchableOpacity onPress={toggleDuplicateItem} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign:'center', color: "#0ABAB5" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = {
    headerText:{
        fontFamily:'ZenOldMincho-Bold', 
        textAlign:'center', 
        fontSize:17, 
        fontWeight: 'bold', 
        color:'#ffffff',
    },
    CurrencyText:{
        fontSize:14,
        fontFamily:'Rubik-Light'
    },
    box:{
        flex:1,
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa'
    },
    Emptybox:{
        flex:1, 
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#2C6264',
        backgroundColor:'#2C6264',
        alignItems: 'center',
    },
    Currencybox:{
        flex:1,
        flexDirection:'row',
        borderRadius:15,
        borderWidth:1, 
        borderColor:'#000000',
        backgroundColor:'#fffffa'
    },
    boxhead:{
        flex:1.2,
        borderTopRightRadius:14,
        borderTopLeftRadius:14,
        flexDirection:'row',
        borderColor:'#000000', 
        justifyContent:'center', 
        backgroundColor:'#0ABAB5'
    },
    ViewTouchableBoxCategoryHealthy:{
        marginVertical:'2%',
        marginHorizontal:20
    },
    ViewTouchableBoxCategoryFurniture:{
        marginTop:'2%',
        marginHorizontal:20
    },
    TouchableItemBox:{
        flex:1,
        width:'100%',
        height:'100%',
        borderRadius:12,
        borderWidth:1, 
        borderColor:'#000000',
        // backgroundColor:'orange'
    },
    viewImageItemBox:{
        alignItems:'center'
    },
    ImageItemBox:{
        position:'relative'
    },
    textStyleItem:{
        fontFamily: 'ZenOldMincho-Bold',
        fontSize: 14
    },
    itemName:{
        flexDirection:'row',
        justifyContent:'center',
        // backgroundColor:'green'
    },
    itemPrice:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'pink'
    },
    viewImageAndNameItemBox:{
        width:'auto',
        height:'auto'
    }
}

const mysteryStyles = {
    viewTouchableBoxCategoryMysteryBox:{
        flexDirection:'row',
        //backgroundColor:'red'
    },
    view136:{
        flex:1.36,
        flexDirection:'column',
        //backgroundColor:'green'
    },
    view164:{
        flex:1.64,
        flexDirection:'column',
        //backgroundColor:'pink'
    },
    viewImage:{
        flex:4.5,
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'yellow'
    },
    imageItemBox:{
        position:'relative',
        borderRadius:12,
        borderWidth:1, 
        borderColor:'#000000',
        //backgroundColor:'brown'
    },
    viewGuarantee:{
        flex:0.5
    },
    textGuaranteeDetaill:{
        fontFamily:'Rubik-Meduim',
        fontSize:10,
        justifyContent:'center',
        marginHorizontal:5
    },
    viewTextTopic:{
        flex:1,
        //backgroundColor:'orange'
    },
    textTopic:{
        fontFamily:'Rubik-Meduim',
        fontSize:24,
        fontWeight:'bold',
        color:'#2C6264'
    },
    viewDetaillTextTopic:{
        flex:0.5,
        //backgroundColor:'green'
    },
    textDetailTopic:{
        fontFamily:'Rubik-Meduim',
        fontSize:12,
        color:'#2C6264'
    },
    viewTouchableOpacity:{
        flex:3.5,
        flexDirection:'row'
    },
    viewKeySecurity:{
        flex:1.35,
        flexDirection:'row'
    },
    touchableMysteryItemBox:{
        flex:1,
        width:'100%',
        borderRadius:12,
        borderWidth:1, 
        borderColor:'#000000',
        marginHorizontal:'5%',
        marginVertical:'10%',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'green'
    },
    viewCountKeySecurity:{
        justifyContent:'center',
        alignItems:'center'
    },
    textDetaillMysteryStyle:{
        fontFamily:'Rubik-Meduim',
        fontSize:12,
        color:'#2C6264',
        marginHorizontal:3
    },
    viewPriceButton:{
        flex:2.65,
        flexDirection:'row'
    },
    viewTextPriceButton:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'yellow'
    },
    viewResetTime:{
        flex:0.5
    },
    viewResetTimeText:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'yellow'
    },
}

const itemsMysteryBox = [
    {
        itemType: "กล่องสุ่ม",
        itemCurrencyType: 'ruby',
        itemName: "CardBoard",
        itemPrice:20,
        itemGuarantee:8,
        itemPhotoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1206324628419649566/image_7_box.png?ex=65db985b&is=65c9235b&hm=9be1bf2dd2ce56b8eb47d27a176c2a2b159ba320b64ed52f2c1ff1351237f4a4&"
    }
]

const UseItem = [
    {
        itemType: "forUse",
        itemCurrencyType: 'ruby',
        itemName: "บัตรกันลดขั้น",
        itemPrice:200,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1222869375200264234/Featherfallingcard.png?ex=6617c8da&is=660553da&hm=992aebb3d25042fe33471afc059ea2123fa04e89c7acd4cca016e2a312c46c82&"
     },
     {
        itemType: "forUse",
        itemCurrencyType: 'ruby',
        itemName: 'บัตรเปลี่ยนสัตว์เลี้ยง',
        itemPrice: 160,
        itemPhotoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1222869375615369226/Petchangercard.png?ex=6617c8da&is=660553da&hm=e0c08dd21682b5731c4932be9a73f2e8dfa3ed69af78eae4436eec5cacaf70d2&"
     }
]

const ItemsFurniture = [
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "ตุ๊กตา",
        itemPrice:700,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1213487950067666984/u8p1ou2w.png?ex=66115738&is=65fee238&hm=bfbc981224319e11a8a2d5fc45f2b428cbae7e2c5cee7c3be55c879e65c7f9ca&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901618450104360/bearSoldout.png?ex=66167bcd&is=660406cd&hm=fbddcfecef49f386f8bbe31f60b81682ede320feafeb4c2987a7f75f24b0ffef&'
    },
    {
        itemType: "wall",
        itemCurrencyType: 'coin',
        itemName: "รูปกรอบสีขาว",
        itemPrice:299,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1213569742908948530/tebucjfk.png?ex=6611a365&is=65ff2e65&hm=18c4c673bf1f2adaf7723bffe79102f3e7eb37242d7c2258480c916cc05bc322&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1213057759226888252/WhiteborderSoldout.png?ex=660fc693&is=65fd5193&hm=1b20a57a59da92a8d28b936280efd20c338f98ac05313e3414fd1dd4777e0aed&'
    },
    {
        itemType: "wall",
        itemCurrencyType: 'coin',
        itemName: "รูปกรอบสีทอง",
        itemPrice:899,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1213569742640779264/1vn4cbyn.png?ex=6611a365&is=65ff2e65&hm=90478abf590d47bb976d84ac59858519a8fa7e2f8306bca588b8dcd957493968&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901619473252434/GoldborderSoldout.png?ex=66167bcd&is=660406cd&hm=c26d898321ec262d0971593dd592818bcec9d179c53139793612a7b4f4cc4c64&'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "หอคอย",
        itemPrice:999,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1213484456149655552/gopzjayv.png?ex=661153f7&is=65fedef7&hm=945391fb9014be49b7b28f0573f309a08e5c6a6146f4522e9675ce9331625819&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901619020275752/towerSoldout.png?ex=66167bcd&is=660406cd&hm=82ac4d4e7f12a98ca4c2b5e17475723b9d4abdd90847b703029f987b8fcf730a&'
    },
    {
        itemType: "wall",
        itemCurrencyType: 'coin',
        itemName: "นาฬิกา",
        itemPrice:80,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1213569742384664626/soo73iin.png?ex=6611a365&is=65ff2e65&hm=5ee5cc138a9d6e8644028bc6c08bb6f6402d0d7def1a3156513999b4bd18862e&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901618097651732/clockSoldout.png?ex=66167bcd&is=660406cd&hm=e0a72348f8a1eeea6594cc11109018a0f9dc12567ec459b9275868df7446616f&'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "โทรศัพท์",
        itemPrice:500,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1213484457974173746/fh7levth.png?ex=661153f8&is=65fedef8&hm=924f4b1791abdfe5666eb7fb560d3609496a0066a15f0693dc596c18f862e385&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901620131762176/phoneSoldout.png?ex=66167bce&is=660406ce&hm=d8f184477a187217ab0f616d177cc295a8195f56ca7d14aeaa315f3347066796&'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "นาฬิกาทราย",
        itemPrice:150,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1213484458628616232/28xhd20g.png?ex=661153f8&is=65fedef8&hm=f155faea98ae8aa1188ddb3dad71359bac9277eec20d3fef1dea7e594e630804&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901617690939453/hourglassSoldout.png?ex=66167bcd&is=660406cd&hm=4c405fb6440b4f3e4e4a75e977ceea4eb885d887f13665dc8275884e3188c235&'
    },
    {
        itemType: "table",
        itemCurrencyType: 'coin',
        itemName: "แจกัน",
        itemPrice:120,
        itemPhotoURL:"https://cdn.discordapp.com/attachments/1202281623585034250/1213484459488313404/55bmz04i.png?ex=661153f8&is=65fedef8&hm=6ef95f50de1970c4d16c872bdaa94c9ca6a84985a4f2f7c95d39d696a44e9ce6&",
        itemSoldoutURL:'https://cdn.discordapp.com/attachments/1202281623585034250/1214901618747772938/flowerSoldout.png?ex=66167bcd&is=660406cd&hm=16754cdb06bdffa5846748315cfd49f7829199831427d361c41ea6a971a307f5&'
    }
]