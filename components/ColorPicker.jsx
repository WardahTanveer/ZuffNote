//@/components/ColorPicker.jsx

import { View, Text, TextInput, StyleSheet, PanResponder, findNodeHandle, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

// --- Helper functions ---
const HSVtoRGB=(h, s, v)=>{
    let f=(n, k=(n+h/60)%6)=>
        v-v*s*Math.max(Math.min(k, 4-k, 1), 0);
    return {
        r: Math.round(f(5)*255),
        g: Math.round(f(3)*255),
        b: Math.round(f(1)*255),
    };
};

const RGBtoHSV=(r, g, b)=>{
    r/=255;
    g/=255;
    b/=255;
    const max=Math.max(r, g, b)
    const min=Math.min(r, g, b);
    const d=max-min;
    let h;
    const s=max===0?0:(d/max);
    const v=max;
    switch(max){
        case min:
            h=0;
            break;
        case r:
            h=(g-b)/d+(g<b?6:0);
            break;
        case g:
            h=(b-r)/d+2;
            break;
        case b:
            h=(r-g)/d+4;
            break;
    }
    h*=60;
    return {h, s, v};
};

const RGBtoHex=({r, g, b, a=1})=>{
    const alpha=Math.round(a*255);
    return (
        "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1).toUpperCase()+alpha.toString(16).padStart(2, "0").toUpperCase()
    );
};

const RGBtoHSL=({r, g, b})=>{
    r/=255;
    g/=255;
    b/=255;
    const max=Math.max(r, g, b)
    const min=Math.min(r, g, b);
    let h, s, l=(max+min)/2;
    if(max===min){
        h=s=0;
    }
    else{
        const d=max-min;
        s=l>0.5?d/(2-max-min):d/(max+min);
        switch(max){
            case r:
                h=(g-b)/d+(g<b?6:0);
                break;
            case g: 
                h=(b-r)/d+2;
                break;
            case b:
                h=(r-g)/d+4;
                break;
        }
        h*=60;
    }
    return {
        h: Math.round(h),
        s: Math.round(s*100),
        l: Math.round(l*100)
    };
};

const parseHexColor = (hex) => {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3 || clean.length === 4) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const a = clean.length >= 8 ? parseInt(clean.substring(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
};

// --- Component ---
const VerticalSlider=({value, onChange, height = 200, gradientColors, reverse=false})=>{
    const [thumbY, setThumbY] = useState(height - value * height);
    const sliderRef = useRef(null);
    const [layoutY, setLayoutY] = useState(0);

    // Update thumb when value changes externally
    useEffect(() => {
        setThumbY(reverse ? value * height : height - value * height);
    }, [value, height, reverse]);

    const handleMove = (pageY) => {
        if (!layoutY) return;
        let y = Math.max(0, Math.min(pageY - layoutY, height));
        setThumbY(y);
        const newValue = reverse ? y / height : 1 - y / height;
        onChange(newValue);
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: e => handleMove(e.nativeEvent.pageY),
        onPanResponderMove: e => handleMove(e.nativeEvent.pageY),
    });

    const handleLayout = () => {
        sliderRef.current?.measure((x, y, w, h, pageX, pageY) => {
        setLayoutY(pageY);
        });
    };
    return (
        <View ref={sliderRef} onLayout={handleLayout} style={{ width: 30, height: 200, marginBottom: 10, marginRight: 10 }} {...panResponder.panHandlers}>

            {/* Gradient track */}
            <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 5 }}
            />
            {/* Thumb */}
            <View style={{alignItems: "center"}}>
                <View style={{ position: "absolute", top: thumbY - 10/2, width: 20, height: 10, borderRadius: 10, borderWidth: 2, borderColor: "#fff", backgroundColor: "#fff" }}/>
            </View>
        </View>
    );
};

const ColorPicker=({initialColor="#FF0000FF", onChange})=>{
    const initialRGB = parseHexColor(initialColor);
    const initialHSV = RGBtoHSV(initialRGB.r, initialRGB.g, initialRGB.b);
    const [opacity, setOpacity] = useState(initialRGB.a);
    const [hsv, setHSV] = useState(initialHSV);
    const [cursor, setCursor] = useState({ x: initialHSV.s * 200, y: (1 - initialHSV.v) * 200 });
    const [layout, setLayout] = useState(null);
    const [hexInput, setHexInput] = useState(initialColor.toUpperCase());
    const [rgbInput, setRgbInput] = useState(`${initialRGB.r}, ${initialRGB.g}, ${initialRGB.b}, ${Math.round(initialRGB.a * 100)}%`);
    const [hslInput, setHslInput] = useState(() => {
        const hsl = RGBtoHSL(initialRGB);
        return `${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${Math.round(initialRGB.a * 100)}%`;
    });

    const pickerRef=useRef(null);
    const squareSize=200;
    const rgb=HSVtoRGB(hsv.h, hsv.s, hsv.v);
    const hex=RGBtoHex({...rgb, a:opacity});
    const hsl=RGBtoHSL(rgb);

    // --- Update inputs & cursor when HSV or opacity changes ---
    useEffect(()=>{
        setHexInput(hex);
        setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.round(opacity*100)}%`);
        setHslInput(`${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${Math.round(opacity*100)}%`);
        // Update cursor position
        setCursor({
            x:hsv.s*squareSize,
            y:(1-hsv.v)*squareSize,
        });
        onChange && onChange(hex);
    }, [hsv, opacity]);

    const handleMeasure=()=>{
        const node=findNodeHandle(pickerRef.current);
        if(node){
            pickerRef.current.measure((x, y, width, height, pageX, pageY)=>{
                setLayout({x:pageX, y:pageY, width, height});
            });
        }
    };

    // --- Drag to pick color ---
    const panResponder=PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderMove:(e, gesture)=>{
        if(!layout){
            return;
        }
        const x=Math.max(0, Math.min(gesture.moveX-layout.x, squareSize));
        const y=Math.max(0, Math.min(gesture.moveY-layout.y, squareSize));
        setCursor({x, y});
        setHSV((prev)=>({
            ...prev,
            s:x/squareSize,
            v:1-y/squareSize,
        }));
        },
    });

    // --- Manual Inputs ---
    const handleHexSubmit=()=>{
        try{
            const clean=hexInput.replace("#", "");
            if(clean.length<6){
                throw new Error("Invalid hex");
            }
            const r=parseInt(clean.substring(0, 2), 16);
            const g=parseInt(clean.substring(2, 4), 16);
            const b=parseInt(clean.substring(4, 6), 16);
            let a=1;
            if(clean.length>=8){
                a=parseInt(clean.substring(6, 8), 16)/255;
            }
            setHSV(RGBtoHSV(r, g, b));
            setOpacity(a);
        }
        catch{
            Alert.alert("Invalid color code");
        }
    };

    const handleRGBSubmit=()=>{
        try {
            const parts=rgbInput.split(",").map((v)=>v.trim());
            const [r, g, b]=parts.slice(0, 3).map(Number);
            const alphaPart=parts[3]?.replace("%", "");
            const newOpacity=alphaPart!==undefined
                ?Math.min(1, Math.max(0, parseFloat(alphaPart) / 100))
                :opacity;
            if ([r, g, b].some(isNaN)){
                throw new Error();
            }
            setHSV(RGBtoHSV(r, g, b));
            setOpacity(newOpacity);
        }
        catch {
            Alert.alert("Invalid RGB value. Use: 255, 0, 0, 100%");
        }
    };

    const handleHSLSubmit=()=>{
        try{
            const parts=hslInput.split(",").map((v)=>v.trim());
            const [h, sStr, lStr, aStr]=parts;
            const s=parseFloat(sStr);
            const l=parseFloat(lStr);
            const newOpacity=aStr && aStr.includes("%")
                ? Math.min(1, Math.max(0, parseFloat(aStr.replace("%", ""))/100))
                : opacity;
            const c=(1-Math.abs(2*(l/100)-1))*(s/100);
            const x=c*(1-Math.abs(((h/60)%2)-1));
            const m=l/100-c/2;
            let r, g, b;
            if(h<60){ [r, g, b]=[c, x, 0]; }
            else if(h<120){ [r, g, b]=[x, c, 0]; }
            else if(h<180){ [r, g, b]=[0, c, x]; }
            else if(h<240){ [r, g, b]=[0, x, c]; }
            else if(h<300){ [r, g, b]=[x, 0, c]; }
            else{ [r, g, b]=[c, 0, x]; }
            setHSV(RGBtoHSV(Math.round((r+m)*255), Math.round((g+m)*255), Math.round((b+m)*255)));
            setOpacity(newOpacity);
        }
        catch{
            Alert.alert("Invalid HSL value. Use: 0, 100%, 50%, 100%");
        }
    };

    return (
        <View style={{flexDirection: "row"}}>
        <View style={styles.container}>
            <View style={{flexDirection: "row"}}>

                {/*Color Picker*/}
                <View ref={pickerRef} onLayout={handleMeasure} style={{ width: squareSize, height: squareSize, marginBottom: 10, marginRight: 10, borderRadius: 10, overflow: "hidden" }} {...panResponder.panHandlers}>
                    <View style={[StyleSheet.absoluteFill, {backgroundColor: `hsl(${hsv.h}, 100%, 50%)`}]}/>
                    <LinearGradient colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill}/>
                    <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFill}/>
                    <View style={{position: "absolute", left: cursor.x - 10, top: cursor.y - 10, width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#fff"}}/>
                </View>

                {/*Hue slider*/}
                <VerticalSlider value={hsv.h / 360} onChange={(v) => setHSV(prev => ({ ...prev, h: v * 360 }))} height={200} gradientColors={["#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF", "#FF0000"]} reverse={true}/>

                {/*Opacity slider*/}
                <VerticalSlider value={opacity} onChange={setOpacity} height={200} gradientColors={[`rgba(${rgb.r},${rgb.g},${rgb.b},1)`, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`]}/>
            </View>

            {/* Editable inputs */}
            <View style={{width: 280}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={styles.colorText}>Hex</Text>
                    <TextInput value={hexInput} onChangeText={setHexInput} onEndEditing={handleHexSubmit} style={styles.input} autoCapitalize="none"/>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={styles.colorText}>RGB</Text>
                    <TextInput value={rgbInput} onChangeText={setRgbInput} onEndEditing={handleRGBSubmit} style={styles.input} autoCapitalize="none"/>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={styles.colorText}>HSL</Text>
                    <TextInput value={hslInput} onChangeText={setHslInput} onEndEditing={handleHSLSubmit} style={styles.input} autoCapitalize="none"/>
                </View>
            </View> 
        </View>
        {/* Preview */}
        <View style={[styles.preview, {backgroundColor: hex}]} />
        </View>
    );
};
export default ColorPicker;

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        width: 240,
        borderWidth: 1,
        borderColor: "#aaa",
        padding: 5,
        marginBottom: 10,
        borderRadius: 5,
    },
    preview: {
        height: 330,
        width: 50,
        marginTop: 7,
        borderRadius: 10
    },
    sliderWrapper: {
        position: "relative",
        height: 30,
        justifyContent: "center",
        marginBottom: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    gradientTrack: {
        ...StyleSheet.absoluteFillObject
    },
    slider: {
        width: "100%",
        height: 200,
    },
    colorText: {
        fontSize: 15,
        fontWeight: "600",
        paddingBottom: 10
    }
});
