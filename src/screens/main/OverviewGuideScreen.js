import { ScrollView, View, TouchableOpacity, Text, Image, StyleSheet} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import RNSpeedometer from 'react-native-speedometer';

export const OverviewGuideScreen = ({navigation, route})=>{
    const {netWealthValue, netCashFlow, survivalRatio, ratioMeasureShortLiability, basicLiquidityRatio, liabilityToAssetRatio,
    debtRepaymentRatioFromIncome, savingsRatio, investmentAssetRatio, incomeFromInvestmentAssetRatio, financialFreedomRatio , guageWealth,guageRiability} = route.params;
    
    const textNetWealthValue = (value)=>{
        if(value > 0){
            return(
                <View style={{height:55, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีเงินออมต่อเดือนอยู่ในเกณฑ์</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ดี </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ซึ่งเงินออมก้อนนี้ ถือเป็นรากฐานสำคัญที่ จะนำไปใช้เพื่อต่อยอดความมั่งคั่งในอนาคตได้</Text>
                </View>
            )
        }
        else if(value <= 0){
            return(
                <View style={{height:75, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันฐานะความมั่งคั่งของคุณอยู่ในเกณฑ์</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> แย่ </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> เพราะคุณมีสินทรัพย์น้อยกว่าหนี้สิน ซึ่งถือว่าเป็นสถานะทางการเงินที่ไม่ดี คุณควรลดการกู้ยืมเพื่อให้หนี้สินลดลง
                    หรือเพิ่มจำนวนของสินทรัพย์รวม เช่น สินทรัพย์สภาพคล่อง</Text>
                </View>
            )
        }
    }

    const textNetCashFlow = (value)=>{
        if(value > 0){
            return(
                <View style={{height:70, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันกระแสเงินสดสุทธิของคุณอยู่ในเกณฑ์</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ดี </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เพราะคุณมีรายได้รวมมากกว่าค่าใช้จ่ายรวม ทำให้คุณมีเงินเหลือ และมีโอกาสในการนำเงินส่วนนี้ไปลงทุนเพื่อต่อยอดความมั่งคั่งได้ในอนาคต</Text>
                </View>
            )
        }
        else if(value <= 0){
            return(
                <View style={{height:75, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันกระแสเงินสดสุทธิของคุณอยู่ในเกณฑ์</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> แย่ </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เพราะคุณมีรายได้รวมน้อยกกว่าค่าใช้จ่ายรวม ทำให้คุณไม่มีเงินเหลือ และทำให้ความมั่งคั่งลดลงคุณควรลดค่าใช้จ่ายที่ไม่จำเป็นหรือหารายได้เพิ่มเติมจากหลายๆด้าน</Text>
                </View>
            )
        }
    }

    const textSurvivalRatio = (value)=>{
        if(value >= 1){
            return(
                <View style={{height:60, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันอัตราส่วนความอยู่รอดของคุณอยู่ในเกณฑ์</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ดี </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เพราะคุณมี รายได้จากการทำงานรวมกับรายได้จากสินทรัพย์ที่มากกว่าค่าใช้จ่ายรวม ทำให้คุณสามารถอยู่รอดได้</Text>
                </View>
            )
        }
        else if(value < 1){
            return(
                <View style={{height:90, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันอัตราส่วนความอยู่รอดของคุณอยู่ในเกณฑ์</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> แย่ </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เพราะคุณมี รายได้จากการทำงานรวมกับรายได้จากสินทรัพย์ที่น้อยกว่าค่าใช้จ่ายรวม ทำให้คุณมีโอกาสอยู่รอดต่ำ คุณควรลดค่าใช้จ่ายที่ไม่จำเป็นลงหรือหารายได้จากทำงานหรือลงทุนเพื่อมีรายได้จากสินทรัพย์</Text>
                </View>
            )
        }
        else if(value == "good"){
            return(
                <View style={{height:90, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันอัตราส่วนความอยู่รอดของคุณอยู่ในเกณฑ์</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ดี </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เพราะคุณไม่มีค่าใช้จ่ายอยู่เลย ทำให้คุณมีโอกาสอยู่รอดอยู่ในเกณฑ์ดี</Text>
                </View>
            )
        }
    }

    const textRatioMeasureShortLiability = (value)=>{
        if(value >= 1){
            return(
                <View style={{height:90, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีอัตราส่วนวัดความสามารถในการชำระหนี้ระยะสั้นอยู่ในเกณฑ์ที่<Text> ดี </Text></Text>
                    
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เพราะคุณมี สินทรัพย์สภาพคล่องมากกว่าหนี้สินระยะสั้น ทำให้คุณสามารถชำระหนี้สินระยะสั้นได้อย่างรวดเร็ว ไม่เกิดปัญหาทางการเงินตามมา</Text>
                </View>
            )
        }
        else if(value < 1){
            return(
                <View style={{height:90, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีอัตราส่วนวัดความสามารถในการชำระหนี้ระยะสั้นอยู่ในเกณฑ์ที่ <Text style={{color:'#ff0000'}}>แย่</Text> <Text>เพราะคุณมี สินทรัพย์สภาพคล่องน้อยกว่าหนี้สินระยะสั้น</Text></Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ทำให้คุณไม่มีสามารถชำระหนี้สินระยะสั้น อาจทำให้เกิดปัญหาทางการเงินตามมา คุณควรจัดการให้หนี้ระยะสั้นลดลงหรือเพิ่มสินทรัพย์สภาพคล่องขึ้นมาแทน</Text>
                </View>
            )
        }
        else{
            return(
                <View style={{height:90, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เนื่องจากคุณไม่มีหนี้สินระยะสั้น จึงไม่สามารถคำนวณได้ กรุณากรอกข้อมูลเพื่อใช้ในการคำนวณ</Text>
                </View>
            )
        }
    }

    const textBasicLiquidityRatio = (value)=>{
        if(value < 3){
            return(
                <View style={{height:90, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีอัตราส่วนสภาพคล่องพื้นฐานอยู่ในเกณฑ์ที่<Text style={{color:'#ff0000'}}> แย่ </Text></Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เพราะคุณมี สินทรัพย์สภาพคล่องมากกว่าค่าใช้จ่ายรวมต่อเดือนไม่ถึง 3 เท่าทำให้คุณมีเงินสำรองฉุกเฉินอยู่ไม่มากพอ ทำให้ลดโอกาสในการลงทุนลง คุณควรลดค่าใช้จ่ายต่อเดือนที่ไม่เป็นลงหรือเพิ่มสินทรัพย์สภาพคล่องให้มากขึ้น</Text>
                </View>
            )
        }
        else if(value >= 3 && value <= 6){
            return(
                <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีเงินสำรองฉุกเฉินที่อยู่ใน เกณฑ์</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ดี </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ซึ่งสามารถนำเงินจากส่วนนี้ไปวาง แผนการเงินด้านอื่นๆ ให้ชีวิตมั่นคงมาก ขึ้นได้อีก</Text>
                </View>
            )
        }
        else if(value > 6){
            return(
                <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีเงินสำรองฉุกเฉินที่อยู่ใน เกณฑ์</Text>
                    <Text style={{color:'#FFA500', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ปานกลาง </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เนื่องจากสินทรัพย์สภาพคล่อง พื้นฐานควรมีแค่ 3-6 เท่า ถ้ามากกว่านี้ควรนำเงินส่วนนั้นไปลงทุนในส่วนอื่น</Text>
                </View>
            )
        }
        else{
            return(
                <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ไม่สามารถแนะนำได้เนื่องจากยังไม่มีข้อมูล กรุณากรอกข้อมูลเพิ่มเพื่อที่จะสามารถแนะนำเพิ่มเติมได้</Text>
                </View>
            )
        }
    }

    const textLiabilityToAssetRatio = (value)=>{
        if(value < 0.5){
            return(
                <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีภาระหนี้สิน</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> น้อย </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ทำให้มีเงินเหลือไปออมหรือลงทุน เพื่อต่อยอดความมั่นคง ได้อีกทางนึง</Text>
                </View>
            )
        }
        else if(value >= 0.5){
            return(
                <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันคุณมีอัตราส่วนหนี้สินต่อสินทรัพย์อยู่ในเกณฑ์</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> แย่ </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เพราะมีหนี้สินรวมมากกว่าสินทรัพย์ คุณควรลดจำนวนหนี้สินรวมให้น้อย โดยอาจจะหาช่องทางการลงทุนเพิ่มเติมเพื่อนำชำระหนี้ส่วนนีให้มีจำนวนน้อยลง</Text>
                </View>
            )
        }else{
            return(
                <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันคุณมีอัตราส่วนหนี้สินต่อสินทรัพย์อยู่ในเกณฑ์</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> แย่ </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เพราะคุณไม่มีสินทรัพย์เลย ควรเพิ่มสินทรัพย์ให้มากขึ้น</Text>
                </View>
            )
        }
    }

    const textDebtRepaymentRatioFromIncome = (value)=>{
        if(value < 0.35){
            return(
                <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณสามารถจัดสรรเงินสำหรับใช้จ่ายและชำระหนี้ ได้เป็นอย่าง</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ดี </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ทำให้มีเงินเหลือไปออมหรือลงทุนเพื่อต่อยอดความมั่นคงได้อีกทางนึง</Text>
                </View>
            )
        }
        else if(value >= 0.35){
            return(
                <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันคุณมีอัตราส่วนการชำระคืนหนี้สินจากรายได้อยู่ในเกณฑ์</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> แย่ <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณควรจัดสรรเงินสำหรับใช้จ่ายชำระหนี้ให้น้อยกว่านี้</Text></Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เนื่องจากมีความเสี่ยงต่อการเงินและ ทำให้มีเงินเหลือไปออมหรือลงทุนน้อยลง</Text>
                </View>
            )
        }
        else{
            if(value == 'bad'){
                return(
                    <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                        <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ปัจจุบันคุณมีอัตราส่วนการชำระคืนหนี้สินจากรายได้อยู่ในเกณฑ์</Text>
                        <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> แย่ <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เนื่องจากคุณไม่มีรายได้เลย</Text></Text>
                        <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ทำให้ไม่มีเงินสำหรับชำระหนี้เลย คุณควรหารายได้เพิ่ม</Text>
                    </View>
                )
            }
            else{
                return(
                    <View style={{height:80, flexDirection:'row', flexWrap:'wrap'}}>
                        <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ไม่สามารถแนะนำได้เนื่องจากยังไม่มีข้อมูล กรุณากรอกข้อมูลเพิ่มเพื่อที่จะสามารถแนะนำเพิ่มเติมได้</Text>
                    </View>
                )
            }
            
        }
    }

    const textSavingsRatio = (value)=>{
        if(value > 10){
            return(
                <View style={{height:60, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีเงินออมต่อเดือนอยู่ในเกณฑ์</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ดี </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ซึ่งเงินออมก้อนนี้ ถือเป็นรากฐานสำคัญที่ จะนำไปใช้เพื่อต่อยอดความมั่งคั่งในอนาคตได้</Text>
                </View>
            )
        }
        else if(value <= 10){
            return(
                <View style={{height:60, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีเงินออม</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ต่ำ </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> กว่าเกณฑ์ ควรเพิ่มเงินออมจากรายได้ 10% เพื่อให้คุณสามารถบรรลุเป้าหมายการออมได้อย่างมีประสิทธิภาพ</Text>
                </View>
            )
        }
    }

    const textInvestmentAssetRatio = (value)=>{
        if(value < 0.5){
            return(
                <View style={{height:100, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>สินทรัพย์ที่มาจากการลงทุนของคุณ อยู่ในเกณฑ์</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ปลอดภัย </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>แต่อาจทำให้คุณได้ ผลตอบแทนที่น้อย ควรให้ความสำคัญกับการลงทุนในสินทรัพย์ ต่างๆ เช่น พันธบัตร หุ้นกู้ กองทุนรวม หรือหุ้นของบริษัทที่เติมโตและมั่นคง ให้มากกว่านี้ เพราะสินทรัพย์ เหล่านี้จะช่วยสร้าง รายได้ และช่วยให้คุณมีความมั่งคั่งเพิ่มมากขึ้น</Text>
                </View>
            )
        }
        else if(value >= 0.5){
            return(
                <View style={{height:85, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>สินทรัพย์ที่มาจากการลงทุนของคุณ มีจำนวนที่</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> มากเกินไป </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ควรจะต้องมีการ ปรับการลงทุน ในสินทรัพย์ ต่างๆ ให้น้อยลง แล้วไปเพิ่มในส่วนของสินทรัพย์ สภาพคล่องแทน เพื่อควบคุมความเสี่ยงจากการลงทุนให้เหมาะสม </Text>
                </View>
            )
        }
    }

    const textIncomeFromInvestmentAssetRatio = (value)=>{
        if(value > 0){
            return(
                <View style={{height:55, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีรายได้จากสินทรัพย์ลงทุน อยู่ในเกณฑ์</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> มาตรฐาน </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ค่อยๆ เพิ่มรายได้ในส่วนนี้ จากการลงทุนไปเรื่อยๆอย่างสม่ำเสมอ มันจะช่วยให้คุณมีความมั่งคั่งและอิสระภาพทางการเงินมากขึ้น </Text>
                </View>
            )
        }
        else if(value <= 0){
            return(
                <View style={{height:55, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณไม่มีรายได้จากสินทรัพย์ลงทุน ซึ่งทำให้มีค่า</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ต่ำกว่าเกณฑ์ </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>ควรเพิ่มรายได้ในส่วนนี้จากการลงทุน ไปเรื่อยๆ อย่างสม่ำเสมอ มันจะช่วยให้คุณมีความมั่งคั่งและอิสระภาพทางการ เงินมากขึ้น </Text>
                </View>
            )
        }
    }

    const textFinancialFreedomRatio = (value)=>{
        if(value > 0){
            return(
                <View style={{height:60, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีอิสรภาพทางการเงินที่</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ดี </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เนื่องจากคุณมีรายได้จากสินทรัพย์ลงทุนมากกว่า ค่าใช้จ่ายทำให้คุณมีโอกาสที่จะอยู่รอดเมื่อเกษียณฯ หรือมีเงินไปใช้จ่ายในด้านอื่นๆ</Text>
                </View>
            )
        }
        else if(value <= 0){
            return(
                <View style={{height:60, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณ</Text>
                    <Text style={{color:'#FF0000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ไม่มี <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>อิสรภาพทางการเงิน เนื่องจากคุณมีรายจ่ายมากกว่า</Text></Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>สินทรัพย์ลงทุนควรมองหาสินทรัพย์ที่สร้างรายได้แบบ “Passive Income” เพื่อการเกษียณฯ</Text>
                </View>
            )
        }
        else{
            return(
                <View style={{height:60, flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>คุณมีอิสรภาพทางการเงินที่</Text>
                    <Text style={{color:'#0ABAB5', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ดี </Text>
                    <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}>เนื่องจากคุณไม่มีค่าใช้จ่ายเลย ทำให้คุณมีโอกาสที่จะอยู่รอดเมื่อเกษียณฯ หรือมีเงินไปใช้จ่ายในด้านอื่นๆ</Text>
                </View>
            )
        }
    }

    const checkText = (value)=>{
        if(value == 'ไม่สามารถคำนวณได้เนื่องจากไม่มีหนี้สินระยะสั้น'){
            return 'ไม่สามารถคำนวณได้เนื่องจากไม่มีหนี้สินระยะสั้น'
        }
        else if(value == 'ไม่สามารถคำนวณได้เนื่องจากไม่มีค่าใช้จ่าย'){
            return 'ไม่สามารถคำนวณได้เนื่องจากไม่มีค่าใช้จ่าย'
        }
        else{
            return value + ' เท่า'
        }
    }

    const checkGoodBadText = (value)=>{
        if(value == 'bad'){
            return 'แย่'
        }
        else if(value == 'good'){
            return 'ดี'
        }
        else if(value == 'ไม่สามารถคำนวณได้เนื่องจากยังไม่มีหนี้สิน'){
            return 'ไม่สามารถคำนวณได้เนื่องจากยังไม่มีหนี้สิน';
        }
        else{
            return value + ' เท่า'
        }
    }

    const textColorBasicLiquidityRatio = (value)=>{
        if(value > 6){
            return '#FFA500'
        }
        else if(value >= 3 && value <= 6){
            return '#0ABAB5'
        }
        else{
            return '#FF0000'
        }
    }
    const checkCriteriaWealth = (value)=>{
        const bar = {
            color:"#D9D9D9",
            text: ""
        }
        if(value >= 7 ){
            bar.color = '#0ABAB5'
            bar.text = "ดี"
            return bar
        }else if(value >= 4){
            bar.color = '#FFD000'
            bar.text = "ปานกลาง"
            return bar
        }else if(value < 4){
            bar.color = '#FF0000'
            bar.text = "แย่"
            return bar
        }
    }
    

    

    


    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1, padding:10}}>
                {/* สุขภาพทางการเงิน */}
                <View style={{height:295, borderRadius:16,borderWidth:1,backgroundColor:'#FFFFFA', borderColor:'#A9A9A9', marginBottom:10}}>
                    <View style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:20, backgroundColor:'#B3DBD8'}}
                    >
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>สุขภาพทางการเงิน</Text>  
                    </View>
                    <View style={{overflow:'hidden',borderColor:'#cfd0cf',marginLeft:10}}>
                        <View style={{height:10}}></View>
                        <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
                            <View style={{justifyContent:'center',alignContent:'center',flexDirection:'column'}}>
                                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:14,textAlign:'center'}}></Text>
                                {/* GAUGE  */}
                                <RNSpeedometer value={guageWealth ? parseFloat(guageWealth) : 0} size={150} minValue={0} maxValue={10} allowedDecimals={1} labels={[
                                    {name:'1',labelColor:'#FFFFFA',activeBarColor:'#80011f'},
                                    {name:'2',labelColor:'#FFFFFA',activeBarColor:'#cf1020'},
                                    {name:'3',labelColor:'#FFFFFA',activeBarColor:'#fb0100'},
                                    {name:'4',labelColor:'#FFFFFA',activeBarColor:'#e34928'},
                                    {name:'5',labelColor:'#FFFFFA',activeBarColor:'#fe7e00'},
                                    {name:'6',labelColor:'#FFFFFA',activeBarColor:'#fec30b'},
                                    {name:'7',labelColor:'#FFFFFA',activeBarColor:'#ffe135'},
                                    {name:'8',labelColor:'#FFFFFA',activeBarColor:'#dffe00'},
                                    {name:'9',labelColor:'#FFFFFA',activeBarColor:'#a4c739'},
                                    {name:'10',labelColor:'#FFFFFA',activeBarColor:'#76ab56'}]}
                                    />
                                <View style={{height:30}}></View>
                                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:14,textAlign:'center'}}>สุขภาพการเงิน</Text>
                            </View>
                            <View style={{width:30}}></View>
                            <View style={{justifyContent:'center',alignContent:'center',flexDirection:'column'}}>
                                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:14,textAlign:'center'}}>*ควรใส่ข้อมูลอย่างสม่ำเสมอ</Text>
                                {/* GAUGE  */}
                                <RNSpeedometer value={guageRiability ? parseFloat(guageRiability) : 0} size={150} minValue={0} maxValue={10} allowedDecimals={1} labels={[
                                    {name:'1',labelColor:'#FFFFFA',activeBarColor:'#08f26e'},
                                    {name:'2',labelColor:'#FFFFFA',activeBarColor:'#06c258'},
                                    {name:'3',labelColor:'#FFFFFA',activeBarColor:'#06a94d'}]}
                                    />
                                <View style={{height:30}}></View>
                                <Text style={{fontFamily:'ZenOldMincho-Regular',fontSize:14,textAlign:'center'}}>ความน่าเชื่อถือ</Text>
                            </View>
                        </View>
                        
                        <View style={{height:20}}></View>
                        <View style ={{height:47.5,flexDirection:"row"}}>
                            <View style ={{flex:3,flexDirection:"column",alignItems:"flex-start"}}>
                                <Text style={{width:260,fontFamily:'ZenOldMincho-Regular',fontSize:16}}>สุขภาพการเงินของคุณ มีคะแนน</Text>
                                <View style={{flexDirection:'row',textAlign:'left'}}>
                                    <Text style={{fontFamily:'ZenOldMincho-Bold',fontSize:16,fontWeight:'bold',color:'#0ABAB5'}}>อยู่ในเกณฑ์ </Text>
                                    <Text style={{fontFamily:'ZenOldMincho-Bold',fontSize:16,fontWeight:'bold',color:checkCriteriaWealth(guageWealth).color}}>{checkCriteriaWealth(guageWealth).text}</Text>
                                </View>
                                {/* <Text style={{width:260,fontFamily:'ZenOldMincho-Bold',fontSize:16,fontWeight:'bold',color:'#0ABAB5'}}>อยู่ในเกณฑ์ {checkCriteriaWealth(guageWealth)}</Text> */}
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderTopLeftRadius: 16, borderBottomRightRadius: 16, backgroundColor: "#B3DBD8" }}>
                                <Text style={{ fontFamily: 'ZenOldMincho-Bold', fontSize: 20, color: '#000000' }}>{guageWealth ? parseFloat(guageWealth) : 0}/10</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ความมั่งคั่งในปัจจุบัน */}
                <View style={{height: 727, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <View style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>ความมั่งคั่งในปัจจุบัน</Text>
                    </View>

                    <View style={{height:200, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.subHeaderText}> ความมั่งคั่งสุทธิ </Text>
                            <Text style={styles.descibeText}> (สินทรัพย์รวม - หนี้สินรวม)</Text>
                        </View>
                        
                        <View style={{flex:2, flexDirection:'row', paddingTop:10}}>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{color:netWealthValue > 0 ? '#0ABAB5' : '#FF0000', fontFamily:'ZenOldMincho-Bold', fontSize:25}}>{netWealthValue} THB</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์ ควรเป็นค่า บวก </Text>
                            </View>
                            
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/overview_1.png')} style={{width: 90, height:90}} />                      
                            </View>    
                        </View>   
                        {textNetWealthValue(netWealthValue)}           
                    </View>
                    

                    <View style={{height:210, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20}}>
                        <View style={{flex:2, flexDirection:'row'}}>
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/overview_2.png')} style={{width: 90, height:90}} />                      
                            </View> 

                            <View style={{flex:2, flexDirection:'column', alignItems:'flex-end'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={[styles.descibeText, {textAlignVertical:'center'}]}> (รายได้รวม - ค่าใช้จ่ายรวม)</Text>
                                    <Text style={styles.subHeaderText}> กระแสเงินสดสุทธิ </Text>
                                </View>
                                <Text style={{color:netCashFlow > 0 ? '#0ABAB5' : '#FF0000', fontFamily:'ZenOldMincho-Bold', fontSize:25, marginTop:10}}>{netCashFlow} THB</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12, marginTop:5}}> จากเกณฑ์ ควรเป็นค่า บวก </Text>
                            </View>
                        </View>   
                        {textNetCashFlow(netCashFlow)}           
                    </View>

                    <View style={{height:250, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20, borderBottomLeftRadius:16, borderBottomRightRadius:16}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนความอยู่รอด </Text>
                            <View style={{flexDirection:'column'}}>
                                <Text style={styles.descibeText}>(รายได้จากการทำงาน+รายได้จาก</Text>
                                <Text style={styles.descibeText}> สินทรัพย์)/ค่าใช้จ่ายรวม</Text>
                            </View>
                        </View>
                        
                        <View style={{flex:2, flexDirection:'row', paddingTop:10}}>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{color:survivalRatio >= 1 || survivalRatio == "good" ? '#0ABAB5' : '#FF0000', fontFamily:'ZenOldMincho-Bold', fontSize:25}}>{checkGoodBadText(survivalRatio)}</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์ ควร มากกว่าหรือเท่ากับ  </Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> 1 เท่า ของค่าใช้จ่ายรวม  </Text>
                            </View>
                            
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/overview_3.png')} style={{width: 90, height:90}} />                      
                            </View>    
                        </View>   
                        {textSurvivalRatio(survivalRatio)}           
                    </View>
                </View>

                {/* สภาพคล่อง */}
                <View style={{height:588, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <View style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>สถาพคล่อง</Text>
                    </View>
                    <View style={{height:260, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนวัดความสามารถในการชำระหนี้ระยะสั้น </Text>
                            <Text style={styles.descibeText}>(สินทรัพย์สภาพคล่อง/หนี้สินระยะสั้น)</Text>
                        </View>
                        
                        <View style={{flex:2, flexDirection:'row', paddingTop:10}}>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{color:ratioMeasureShortLiability >= 1 ? '#0ABAB5' : '#FF0000', fontFamily:'ZenOldMincho-Bold', fontSize:ratioMeasureShortLiability == 'ไม่สามารถคำนวณได้เนื่องจากไม่มีหนี้สินระยะสั้น' ? 14 : 25}}>{checkText(ratioMeasureShortLiability)}</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์ ควร มากกว่าหรือเท่ากับ 1 เท่า </Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ของหนี้สินรวม </Text>
                            </View>
                            
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/creditCard1.png')} style={{width: 90, height:90}} />                      
                            </View>    
                        </View>   
                        {textRatioMeasureShortLiability(ratioMeasureShortLiability)}           
                    </View>

                    <View style={{height:260, backgroundColor:'#FFFFFA',borderBottomLeftRadius:16, borderBottomRightRadius:16, borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20}}>
                        <View style={{flex:2, flexDirection:'row'}}>
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/moneyExchange.png')} style={{width: 90, height:90}} />                      
                            </View> 

                            <View style={{flex:2.5, flexDirection:'column', alignItems:'flex-end'}}>
                                <Text style={styles.subHeaderText}> อัตราส่วนสภาพคล่องพื้นฐาน </Text>
                                <Text style={styles.descibeText}>(สินทรัพย์สภาพคล่องต่อเดือน/ค่าใช้จ่ายรวมต่อเดือน)</Text>
                                <Text style={{color:textColorBasicLiquidityRatio(basicLiquidityRatio), fontFamily:'ZenOldMincho-Bold', fontSize:basicLiquidityRatio == 'ไม่สามารถคำนวณได้เนื่องจากไม่มีค่าใช้จ่าย' ? 14 : 25, marginTop:10}}>{checkText(basicLiquidityRatio)}</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12, marginTop:5}}>จากเกณฑ์ ควร มากกว่าหรือเท่ากับ</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12, marginTop:5}}>1 เท่า ของค่าใช้จ่ายรวม</Text>
                            </View>
                        </View>   
                        {textBasicLiquidityRatio(basicLiquidityRatio)}         
                    </View>
                </View>

                {/* หนี้สินและความสามารถในการชำระหนี้ */}
                <View style={{height:568, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <View style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>หนี้สินและความสามารถในการชำระหนี้</Text>
                    </View>
                    <View style={{height:260, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนหนี้สินต่อสินทรัพย์ </Text>
                            <Text style={styles.descibeText}>(หนี้สินรวม/สินทรัพย์รวม)</Text>
                        </View>
                        
                        <View style={{flex:2, flexDirection:'row', paddingTop:10}}>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{color:liabilityToAssetRatio < 0.5 ? '#0ABAB5' : '#FF0000', fontFamily:'ZenOldMincho-Bold', fontSize:25}}>{checkGoodBadText(liabilityToAssetRatio)}</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์มาตรฐาน ควร น้อยกว่า 0.5 เท่า  </Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ของสินทรัพย์รวม </Text>
                            </View>
                            
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/homeAndCar.png')} style={{width: 90, height:90}} />                      
                            </View>    
                        </View>   
                        {textLiabilityToAssetRatio(liabilityToAssetRatio)}           
                    </View>

                    <View style={{height:240, backgroundColor:'#FFFFFA',borderBottomLeftRadius:16, borderBottomRightRadius:16, borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20}}>
                        <View style={{flex:2, flexDirection:'row'}}>
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/manAndDEBT.png')} style={{width: 90, height:90}} />                      
                            </View> 

                            <View style={{flex:2.5, flexDirection:'column', alignItems:'flex-end'}}>
                                <Text style={styles.subHeaderText}> อัตราส่วนการชำระคืนหนี้สินจากรายได้ </Text>
                                <Text style={styles.descibeText}>(การชำระหนี้สินต่อเดือน/รายได้รวมต่อเดือน)</Text>
                                <Text style={{color:debtRepaymentRatioFromIncome < 0.35 ? '#0ABAB5' : '#FF0000', fontFamily:'ZenOldMincho-Bold', fontSize:debtRepaymentRatioFromIncome == 'ไม่สามารถคำนวณได้เนื่องจากยังไม่มีหนี้สิน' ? 14 : 25, marginTop:10}}>{checkGoodBadText(debtRepaymentRatioFromIncome)}</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12, marginTop:5}}>จากเกณฑมาตรฐาน์ ควร มีค่าน้อยกว่า 0.35 เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12, marginTop:5}}>ของรายได้รวมต่อเดือน</Text>
                            </View>
                        </View>   
                        {textDebtRepaymentRatioFromIncome(debtRepaymentRatioFromIncome)}         
                    </View>
                </View>

                {/* โอกาสในการสร้างความมั่งคั่ง (การออม) */}
                <View style={{height:277, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <View style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>โอกาสในการสร้างความมั่งคั่ง (การออม)</Text>
                    </View>
                    <View style={{height:210, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20, borderBottomLeftRadius:16, borderBottomRightRadius:16}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนการออม </Text>
                            <Text style={styles.descibeText}>(เงินออม/รายได้รวม)</Text>
                        </View>
                        
                        <View style={{flex:2, flexDirection:'row', paddingTop:10}}>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{color:savingsRatio > 10 ? '#0ABAB5' : '#FF0000', fontFamily:'ZenOldMincho-Bold', fontSize:25}}>{savingsRatio} เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์มาตรฐาน ควร มากกว่า 10 % </Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ของรายได้ </Text>
                            </View>
                            
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/handCoin.png')} style={{width: 90, height:90}} />                      
                            </View>    
                        </View>   
                        {textSavingsRatio(savingsRatio)}           
                    </View>
                </View>

                {/* โอกาสในการสร้างความมั่งคั่ง (การลงทุน) */}
                <View style={{height: 756, borderRadius:16,borderWidth:1, borderColor:'#A9A9A9', marginBottom:10}}> 
                    <View style={{height:65, borderTopLeftRadius:15, borderTopRightRadius:15, justifyContent:'center', paddingLeft:15, backgroundColor:'#B3DBD8'}}>
                        <Text style={{fontFamily:'ZenOldMincho-Bold', fontSize:16, color:'#000000'}}>โอกาสในการสร้างความมั่งคั่ง (การลงทุน)</Text>
                    </View>

                    <View style={{height:260, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.subHeaderText}> อัตราส่วนสินทรัพย์ลงทุน </Text>
                            <Text style={[styles.descibeText, {textAlignVertical:'center'}]}> (สินทรัพย์ลงทุน / สินทรัพย์รวม)</Text>
                        </View>
                        
                        <View style={{flex:2, flexDirection:'row', paddingTop:10}}>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={{color:investmentAssetRatio < 0.5 ? '#0ABAB5' : '#FF0000', fontFamily:'ZenOldMincho-Bold', fontSize:25}}>{investmentAssetRatio} เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> จากเกณฑ์ ควรมีค่า น้อยกว่า 0.5 เท่า </Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12}}> ของ สินทรัพย์รวม </Text>
                            </View>
                            
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/coinPlant.png')} style={{width: 90, height:90}} />                      
                            </View>    
                        </View>   
                        {textInvestmentAssetRatio(investmentAssetRatio)}           
                    </View>
                    

                    <View style={{height:210, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20}}>
                        <View style={{flex:2, flexDirection:'row'}}>
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/percenFinancial.png')} style={{width: 90, height:90}} />                      
                            </View> 

                            <View style={{flex:2, flexDirection:'column', alignItems:'flex-end'}}>
                                <Text style={styles.subHeaderText}> อัตราส่วนการสร้างรายได้ </Text>
                                <Text style={styles.subHeaderText}> จากสินทรัพย์ลงทุน </Text>
                                <Text style={styles.descibeText}> (รายได้จากสินทรัพย์ลงทุน / รายรับรวม)</Text>
                                <Text style={{color:incomeFromInvestmentAssetRatio > 0 ? '#0ABAB5' : '#FF0000', fontFamily:'ZenOldMincho-Bold', fontSize:25, marginTop:10}}>{incomeFromInvestmentAssetRatio} เท่า</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12, marginTop:5}}> จากเกณฑ์ ควรมีค่ามากกว่า 0 </Text>
                            </View>
                        </View>   
                        {textIncomeFromInvestmentAssetRatio(incomeFromInvestmentAssetRatio)}           
                    </View>

                    <View style={{height:220, backgroundColor:'#FFFFFA',borderBottomWidth:1,borderColor:'#D2DBD6', paddingHorizontal:20, paddingTop:20, borderBottomLeftRadius:16, borderBottomRightRadius:16}}>
                        <View style={{flex:1, flexDirection:'row', paddingTop:10}}>
                            <View style={{flex:2, flexDirection:'column'}}>
                                <Text style={styles.subHeaderText}> อัตราส่วนอิสรภาพทางการเงิน </Text>
                                <Text style={styles.descibeText}>(รายได้จากสินทรัพย์ลงทุน/รายจ่าย)</Text>
                                <Text style={{color:financialFreedomRatio == '0' ? '#FF0000' : '#0ABAB5', fontFamily:'ZenOldMincho-Bold', fontSize:25, marginTop:10}}>{checkGoodBadText(financialFreedomRatio)}</Text>
                                <Text style={{color:'#000000', fontFamily:'ZenOldMincho-Regular', fontSize:12, marginTop:5}}> จากเกณฑ์ ควรมีค่ามากกว่า 0  </Text>
                            </View>
                            
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../assets/moneyFly.png')} style={{width: 90, height:90}} />                      
                            </View>    
                        </View>   
                        {textFinancialFreedomRatio(financialFreedomRatio)}           
                    </View>
                </View>
                <View style={{height:20}}></View>
            </ScrollView>
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
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    },

    bodyText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:14,
        color:'#000000'
    },
    
    descibeText:{
        fontFamily:'ZenOldMincho-Regular',
        fontSize:10,
        color:'#A9A9A9'
    }
})
