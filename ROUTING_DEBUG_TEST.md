# 🔧 Routing Debug Test Guide

## 🎯 Testing Blue Route Line Display

Follow these steps to test and debug the blue route line functionality:

### **Step 1: Open Browser Console**
1. **Open Admin Dashboard**: http://localhost:3000/admin/issues
2. **Login**: admin@civic.com / admin123
3. **Open Developer Tools**: Press F12
4. **Go to Console tab**: Look for routing messages

### **Step 2: Enable Location & Open Map**
1. **Click "Enable Location"** (top-right button)
2. **Allow location permission** when prompted
3. **Click "Map View"** to open the map modal
4. **Check console**: Should see location coordinates

### **Step 3: Test Route Calculation**
1. **Click any red issue marker** on the map
2. **Watch console messages**: Look for these logs:
   ```
   🗺️ Requesting route from admin location: {...} to issue location: {...}
   🗺️ Getting simple route from: {...} to: {...}
   🌐 OSRM URL: https://router.project-osrm.org/route/v1/driving/...
   📊 OSRM Response: {...}
   🛣️ Route coordinates count: X
   ✅ Route processed successfully
   🎨 Drawing route line with coordinates: X points
   ✅ Route line created successfully
   🗺️ Route line added to map layer
   📏 Route bounds: {...}
   🔍 Route line on map: true
   ```

### **Step 4: Visual Verification**
**Expected Results:**
- ✅ **Blue line appears** connecting admin location to issue location
- ✅ **Green start marker** (🚩) at admin location
- ✅ **Red end marker** (🎯) at issue location
- ✅ **Map auto-zooms** to show complete route
- ✅ **Route follows roads** (if OSRM works) or straight line (fallback)

### **Step 5: Troubleshooting**

#### **If No Blue Line Appears:**

**Check Console for Errors:**
1. **CORS errors**: OSRM might be blocked
2. **Network errors**: Internet connection issues
3. **Coordinate errors**: Invalid lat/lng values

**Force Fallback Route:**
1. **Disconnect internet** temporarily
2. **Click issue marker** again
3. **Should see**: Dashed blue line (fallback route)
4. **Console should show**: "🔄 Creating emergency fallback route"

#### **If Route Calculation Fails:**
1. **Check admin location**: Ensure location is enabled
2. **Check issue coordinates**: Verify issue has valid location
3. **Try different issues**: Test with multiple markers
4. **Refresh page**: Clear any cached errors

### **Step 6: Manual Testing**

#### **Test with Known Coordinates:**
Open browser console and run:
```javascript
// Test routing service directly
import routingService from './src/utils/routingService.js';

// Test coordinates (New York area)
const start = { lat: 40.7589, lng: -73.9851 };
const end = { lat: 40.7505, lng: -73.9934 };

routingService.getSimpleRoute(start, end).then(route => {
  console.log('Test route:', route);
});
```

#### **Force Blue Line Display:**
If routing fails, you can manually add a blue line:
```javascript
// Get map instance
const map = window.mapInstance; // Assuming map is exposed globally

// Create blue line
const coords = [
  [40.7589, -73.9851], // Start
  [40.7505, -73.9934]  // End
];

const blueLine = L.polyline(coords, {
  color: '#3B82F6',
  weight: 8,
  opacity: 0.9
}).addTo(map);

console.log('Manual blue line added');
```

### **Step 7: Network Debugging**

#### **Check OSRM API:**
1. **Open Network tab** in Developer Tools
2. **Click issue marker** to trigger routing
3. **Look for request** to `router.project-osrm.org`
4. **Check response**: Should return route data

#### **Test OSRM Directly:**
Open this URL in browser (replace coordinates):
```
https://router.project-osrm.org/route/v1/driving/-73.9851,40.7589;-73.9934,40.7505?overview=full&geometries=geojson&steps=true
```

**Expected Response:**
```json
{
  "routes": [
    {
      "geometry": {
        "coordinates": [[lng,lat], [lng,lat], ...]
      },
      "distance": 1234,
      "duration": 567
    }
  ]
}
```

### **Step 8: Fallback Verification**

#### **Test Fallback Route:**
1. **Disable internet** or block OSRM domain
2. **Click issue marker**
3. **Should see**:
   - ✅ Dashed blue line (direct route)
   - ✅ Simple green/red markers
   - ✅ "⚠️ Using direct route" message
   - ✅ Console: "🔄 Creating emergency fallback route"

### **Step 9: Success Indicators**

#### **Route Working Correctly:**
- ✅ **Console logs**: All routing messages appear
- ✅ **Blue line**: Visible on map
- ✅ **Markers**: Start and end points shown
- ✅ **Auto-zoom**: Map fits route bounds
- ✅ **No errors**: Console shows success messages

#### **Fallback Working:**
- ✅ **Dashed blue line**: Direct route shown
- ✅ **Warning message**: "Using direct route"
- ✅ **Basic markers**: Simple start/end indicators

### **Step 10: Common Issues & Solutions**

#### **Issue: No blue line at all**
**Solution**: Check if routing layer exists
```javascript
console.log('Routing layer:', routingLayerRef.current);
console.log('Map instance:', mapInstanceRef.current);
```

#### **Issue: CORS errors**
**Solution**: OSRM might be blocked, fallback should work

#### **Issue: Invalid coordinates**
**Solution**: Check admin location and issue coordinates
```javascript
console.log('Admin location:', adminLocation);
console.log('Issue coordinates:', selectedIssue.location.coordinates);
```

#### **Issue: Map not updating**
**Solution**: Force map refresh
```javascript
mapInstanceRef.current.invalidateSize();
```

---

## 🎯 Quick Test Checklist

- [ ] Admin location enabled
- [ ] Map view opened
- [ ] Issue marker clicked
- [ ] Console shows routing logs
- [ ] Blue line appears on map
- [ ] Markers show start/end points
- [ ] Map auto-zooms to route
- [ ] Fallback works if routing fails

**If all items checked**: ✅ **Routing is working correctly!**

**If some items fail**: Check console errors and follow troubleshooting steps above.