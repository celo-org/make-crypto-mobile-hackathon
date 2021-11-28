# Recycling Machine Emulator
A service running on Raspberry Pi which uses a breadboard, some LEDs and buttons to simulate inserting the bottle into the recycling machine. Each button on the breadboard represents an inserting different kind of bottle: aluminium cans, glass bottles, tetra pak, or PET(plastic bottles). Tested on Ubuntu Server for Raspberry Pi.

### Option without a Raspberry Pi
If Raspberry Pi and the breadboard are not available, the HTTP request can be sent directly to the Recycling Machine backend service, e.g. using cURL:
```bash
curl -X POST -d 'packagingType=aluminium' http://[backend-service-url]/insertBottle
```
Value of the **packagingType** parameter can be one of the following: 
- 'pet'
- 'tetra_pak'
- 'glass'
- 'aluminium'
