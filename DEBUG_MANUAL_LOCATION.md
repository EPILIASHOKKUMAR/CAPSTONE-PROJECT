# 🔍 DEBUG: Manual Location Selection

## 🚨 TROUBLESHOOTING GUIDE

If the manual location selection is not working, follow these debugging steps:

## 🧪 **Step 1: Test Standalone Map**

I've created a standalone test page. Open this in your browser:
```
file:///c:/Users/eppil/Downloads/capstone-main/capstone-main/test-manual-location.html
```

**Expected Results:**
- ✅ Map loads and displays
- ✅ Clicking on map creates blue marker
- ✅ Marker can be dragged
- ✅ Coordinates update correctly

**If this works**: The map functionality is fine, issue is in React integration
**If this doesn't work**: There's a fundamental map/Leaflet issue

## 🧪 **Step 2: Test React App**

### **2.1: Open Issue Reporting Page**
```
URL: http://localhost:3000/report
```

### **2.2: Check Console for Errors**
1. **Open browser console** (F12)
2. **Look for red errors** when page loads
3. **Common issues**:
   - Leaflet CSS not loading
   - React component errors
   - Missing dependencies

### **2.3: Test Step-by-Step**
1. **Fill in basic info** and go to Step 2
2. **Check console** for map initialization messages:
   ```
   🗺️ Initializing map...
   ✅ Map click handler added for location selection
   ✅ Map initialized successfully
   ```
3. **If missing**: Map component not initializing properly

### **2.4: Test Map Interaction**
1. **Click on map**
2. **Check console** for click messages:
   ```
   🎯 Map clicked at: {lat: X.XXXXXX, lng: Y.YYYYYY}
   Location selected: {lat: X.XXXXXX, lng: Y.YYYYYY}
   📍 Adding manual location marker at: {lat: X, lng: Y}
   ✅ Manual location marker added
   ```
3. **If missing**: Click handler not working

## 🧪 **Step 3: Check Component Props**

### **3.1: Verify MapComponent Props**
In ReportIssue.js, the MapComponent should have:
```javascript
<MapComponent
  clickable={true}                    // ✅ Must be true
  onLocationChange={handleLocationSelect}  // ✅ Must be function
  onMapClick={handleLocationSelect}        // ✅ Must be function
  draggableMarker={true}                   // ✅ Must be true
  currentLocation={selectedLocation}       // ✅ Should update
/>
```

### **3.2: Check handleLocationSelect Function**
Should see this in console when clicking:
```
Location selected: {lat: X.XXXXXX, lng: Y.YYYYYY}
```

## 🧪 **Step 4: Common Issues & Fixes**

### **Issue 1: Map Loads But No Click Response**
**Symptoms**: Map displays but clicking does nothing
**Causes**:
- `clickable={true}` not set
- `onLocationChange` not provided
- Click handler not attached

**Fix**: Check MapComponent props in ReportIssue.js

### **Issue 2: Click Works But No Marker**
**Symptoms**: Console shows click events but no blue marker
**Causes**:
- Marker creation failing
- CSS/styling hiding marker
- Layer not added to map

**Fix**: Check marker creation code in MapComponent

### **Issue 3: Marker Appears But Can't Drag**
**Symptoms**: Blue marker shows but won't drag
**Causes**:
- `draggableMarker={false}` or not set
- Drag handler not attached
- CSS preventing interaction

**Fix**: Verify `draggableMarker={true}` prop

### **Issue 4: No Visual Feedback**
**Symptoms**: Everything works but no status badges
**Causes**:
- Badge rendering logic issues
- CSS hiding badges
- Conditional rendering problems

**Fix**: Check badge display conditions in MapComponent

## 🧪 **Step 5: Manual Testing Commands**

### **5.1: Test in Browser Console**
Open console on the report page and run:
```javascript
// Check if map instance exists
console.log('Map instance:', window.mapInstance);

// Test manual click simulation
if (window.mapInstance) {
  // Simulate a click at NYC coordinates
  const fakeEvent = {
    latlng: { lat: 40.7589, lng: -73.9851 }
  };
  
  // This should trigger the click handler
  window.mapInstance.fire('click', fakeEvent);
}
```

### **5.2: Check React Component State**
```javascript
// Check if React DevTools shows selectedLocation state
// Should update when clicking on map
```

## 🧪 **Step 6: Network Issues**

### **6.1: Check Map Tiles Loading**
- **Look for**: Gray tiles or missing map imagery
- **Cause**: Network issues or tile server problems
- **Fix**: Try refreshing or check internet connection

### **6.2: Check Geocoding Service**
- **Test**: Click map and see if address auto-fills
- **If fails**: Geocoding service might be down (non-critical)
- **Expected**: Address fields should populate automatically

## 🧪 **Step 7: Browser Compatibility**

### **7.1: Test Different Browsers**
- **Chrome**: Should work perfectly
- **Firefox**: Should work perfectly  
- **Safari**: Should work with minor differences
- **Edge**: Should work perfectly

### **7.2: Check Mobile Devices**
- **Touch events**: Should work on mobile
- **Responsive design**: Map should fit screen
- **Performance**: Should be smooth on mobile

## ✅ **Expected Working State**

When everything works correctly:

1. **Page loads** → Map displays with tiles
2. **See blue badge** → "🎯 Click to Select Location"
3. **Click map** → Blue marker appears instantly
4. **Badge changes** → "✅ Location Selected"
5. **Can drag marker** → Position updates smoothly
6. **Click elsewhere** → Marker moves to new location
7. **Address auto-fills** → Street, city, etc. populate
8. **Can proceed** → Next step button works

## 🚨 **If Still Not Working**

### **Last Resort Fixes:**

1. **Clear browser cache** and refresh
2. **Restart frontend server** (npm start)
3. **Check for JavaScript errors** in console
4. **Try incognito/private browsing** mode
5. **Update browser** to latest version

### **Get Help:**
If none of these steps work, provide:
- Browser and version
- Console error messages
- Screenshots of the issue
- Results from standalone test page

---

## 🎯 **Quick Test Checklist**

- [ ] Standalone test page works
- [ ] React app loads without errors
- [ ] Map displays with tiles
- [ ] Blue badge shows "Click to Select"
- [ ] Clicking creates blue marker
- [ ] Marker can be dragged
- [ ] Badge shows "Location Selected"
- [ ] Coordinates update correctly
- [ ] Address auto-fills (optional)
- [ ] Can proceed to next step

**If all checked**: Manual location selection is working perfectly! ✅