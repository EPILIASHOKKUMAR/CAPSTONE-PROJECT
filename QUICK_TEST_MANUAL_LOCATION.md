# 🎯 QUICK TEST: Manual Location Selection

## ✅ READY TO TEST

The manual location selection is now fully implemented! Here's a quick test to verify everything works:

## 🧪 **IMMEDIATE TEST STEPS**

### **Step 1: Open Issue Reporting**
```
URL: http://localhost:3000/report
```

### **Step 2: Fill Basic Info**
1. **Title**: "Test Issue"
2. **Category**: Select any category (e.g., "Pothole")
3. **Description**: "Testing manual location selection"
4. **Click "Next"**

### **Step 3: Test Manual Location Selection**
1. **You should see**: Blue badge "🎯 Click to Select Location"
2. **Click anywhere on the map**
3. **You should see**: 
   - Blue marker (📍) appears at clicked location
   - Badge changes to "✅ Location Selected"
   - Map centers on selected location
   - Toast message: "📍 Location selected on map!"

### **Step 4: Test Marker Dragging**
1. **Grab the blue marker** and drag it
2. **You should see**:
   - Marker moves to new position
   - Coordinates update
   - Address fields may auto-populate

### **Step 5: Test Location Change**
1. **Click elsewhere on the map**
2. **You should see**:
   - Marker moves to new clicked location
   - New coordinates
   - New toast message

## 🔍 **Console Messages to Look For**

Open browser console (F12) and look for:
```
🗺️ Initializing map...
✅ Map click handler added for location selection
✅ Map initialized successfully
🎯 Map clicked at: {lat: X.XXXXXX, lng: Y.YYYYYY}
Location selected: {lat: X.XXXXXX, lng: Y.YYYYYY}
📍 Adding manual location marker at: {lat: X, lng: Y}
✅ Manual location marker added
```

## 🚨 **If Something's Not Working**

### **Problem: No blue badge visible**
- **Check**: Make sure you're on Step 2 (Location step)
- **Solution**: Complete Step 1 first

### **Problem: Map doesn't respond to clicks**
- **Check**: Console for errors
- **Solution**: Refresh page and try again

### **Problem: No blue marker appears**
- **Check**: Console shows "Map clicked at:" message
- **Solution**: If message appears but no marker, there's a rendering issue

### **Problem: Can't drag marker**
- **Check**: Marker should have move cursor when hovering
- **Solution**: Verify draggableMarker prop is set

## ✅ **Expected Results**

If everything works correctly, you should be able to:
- ✅ Click anywhere on map to select location
- ✅ See blue marker appear instantly
- ✅ Drag marker to adjust position
- ✅ Click elsewhere to change location
- ✅ See coordinates in marker popup
- ✅ Proceed to next step successfully

## 🎉 **Success!**

If all tests pass, the manual location selection is working perfectly! Users can now precisely select where their civic issues are located by clicking on the map.

---

**Quick Test URL**: http://localhost:3000/report

**Expected Time**: 2-3 minutes to complete all tests

**Result**: Fully functional manual location selection for issue reporting! 🚀📍