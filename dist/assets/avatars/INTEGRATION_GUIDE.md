# Avatar System Integration Guide

## Quick Start

### 1. Include the Avatar Manager in Your HTML

```html
<!-- Add this script tag to emp.html -->
<script src="js/avatar-manager.js"></script>
```

✅ Already added to `emp.html` (line 2604)

### 2. Add Avatar Display Elements

```html
<!-- Sidebar Avatar -->
<div id="sidebar-user-avatar" data-avatar-display>?</div>

<!-- Header Avatar -->
<div id="header-profile-avatar" data-avatar-display>?</div>

<!-- Profile Modal Avatar -->
<div id="profile-avatar-display" data-avatar-display>?</div>
```

✅ Already added to `emp.html`

### 3. Add Avatar Manager Button to Profile Modal

```html
<button type="button" onclick="document.getElementById('modal-avatar-picker')?.classList.remove('hidden')"
    class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition">
    <i class="fa-solid fa-image"></i> Change
</button>
```

✅ Already added to profile section in `emp.html` (line 2074)

---

## Features Implemented

### ✅ Default Avatar with Initials

When no custom avatar is set, displays user initials with auto-generated color:

```javascript
// System automatically shows:
// - User initials (e.g., "JD" for John Doe)
// - Unique color based on name hash
// - Shows on all avatar display elements
```

### ✅ Avatar Upload & Management

Users can upload custom avatars through profile modal:

1. Click "Change Profile Avatar" button in profile
2. Select image (JPEG, PNG, WebP)
3. Preview appears automatically
4. Click "Upload Avatar" to save
5. Or "Reset to Default" to remove

### ✅ Drag & Drop Support

```html
<!-- Automatic drag & drop support -->
<label class="receipt-label">
    <input type="file" id="avatar-file-input" accept="image/*">
</label>
```

### ✅ Image Auto-Compression

```javascript
// Images automatically compressed to:
// - Max 200x200 pixels
// - 70% JPEG quality
// - Base64 data URL (~25-50KB)
```

### ✅ Multiple Storage Options

**LocalStorage** (Primary):
```javascript
localStorage.setItem('explyra_user_avatar_' + userId, dataUrl);
```

**Firestore** (Optional):
```javascript
await updateDoc(userRef, {
    avatarUrl: dataUrl,
    avatarUpdatedAt: serverTimestamp()
});
```

### ✅ Real-time Display Updates

```javascript
// All avatar display elements update simultaneously
window.avatarManager.updateAllAvatarDisplays();

// Sidebar avatar updates
window.avatarManager.updateAvatarDisplay('sidebar-user-avatar');

// Header avatar updates
window.avatarManager.updateAvatarDisplay('header-profile-avatar');

// Profile modal avatar updates
window.avatarManager.updateAvatarDisplay('profile-avatar-display');
```

---

## File Structure

```
d:\Expense Tracker\
├── assets\
│   └── avatars\
│       ├── README.md                    # Full documentation
│       └── test-avatar-system.js        # Test suite
├── js\
│   └── avatar-manager.js                # Main module
├── emp.html                             # Updated with avatar UI
└── [Other files...]
```

---

## API Reference

### AvatarManager Class

#### Constructor

```javascript
const manager = new AvatarManager();
```

**Properties:**
- `storageKey` - LocalStorage key prefix
- `maxFileSize` - Maximum file size (5MB)
- `allowedTypes` - Allowed MIME types
- `avatarDefaults` - Default values

#### Methods

##### `getAvatarUrl(userId)`

Get user's avatar URL or default

```javascript
const url = window.avatarManager.getAvatarUrl(userId);
// Returns: Data URL string or logo URL
```

##### `getAvatarInitials(name)`

Get user's initials

```javascript
const initials = window.avatarManager.getAvatarInitials('John Doe');
// Returns: "JD"
```

##### `getAvatarColor(name)`

Get avatar background color

```javascript
const color = window.avatarManager.getAvatarColor('John Doe');
// Returns: "rgb(59, 130, 246)"
```

##### `uploadAvatar(file, userId)`

Upload and save avatar

```javascript
try {
    const file = document.getElementById('file-input').files[0];
    await window.avatarManager.uploadAvatar(file);
    window.showToast('Avatar updated!', 'success');
} catch (error) {
    window.showToast(error.message, 'error');
}
```

**Throws:**
- Invalid file type error
- File size too large error

##### `removeAvatar(userId)`

Remove avatar and revert to default

```javascript
await window.avatarManager.removeAvatar();
```

##### `updateAvatarDisplay(elementId)`

Update specific avatar element

```javascript
window.avatarManager.updateAvatarDisplay('sidebar-user-avatar');
```

##### `updateAllAvatarDisplays()`

Update all avatar elements on page

```javascript
window.avatarManager.updateAllAvatarDisplays();
```

##### `compressImage(file)`

Compress image to data URL

```javascript
const dataUrl = await window.avatarManager.compressImage(file);
// Returns: Base64 encoded JPEG
```

##### `setupFileInputHandler()`

Setup file input for avatar picker

```javascript
window.avatarManager.setupFileInputHandler();
```

##### `uploadFromInput()`

Upload avatar from file input element

```javascript
// Called by upload button in modal
window.avatarManager.uploadFromInput();
```

##### `removeAvatarConfirm()`

Remove avatar with confirmation

```javascript
// Called by reset button in modal
await window.avatarManager.removeAvatarConfirm();
```

##### `createAvatarPickerModal()`

Create avatar picker modal

```javascript
const modal = window.avatarManager.createAvatarPickerModal();
// Returns: HTMLElement
```

##### `init()`

Initialize avatar system

```javascript
// Auto-called on page load
await window.avatarManager.init();
```

---

## Usage Examples

### Basic Setup

```javascript
// 1. Create manager (auto-created on page load)
const manager = window.avatarManager;

// 2. Get current user's avatar URL
const avatarUrl = manager.getAvatarUrl(window.userData?.docId);

// 3. Display in custom element
document.getElementById('my-avatar').style.backgroundImage = 
    `url('${avatarUrl}')`;
```

### Upload Avatar

```javascript
// 1. Listen to upload button
document.getElementById('btn-upload-avatar').addEventListener('click', async () => {
    const fileInput = document.getElementById('avatar-file-input');
    
    if (!fileInput.files[0]) {
        alert('Please select an image');
        return;
    }
    
    try {
        await window.avatarManager.uploadAvatar(fileInput.files[0]);
        window.showToast('Avatar updated!', 'success');
        window.avatarManager.updateAllAvatarDisplays();
    } catch (error) {
        window.showToast(error.message, 'error');
    }
});
```

### Display Custom Avatar in Canvas

```javascript
// 1. Get avatar URL
const avatarUrl = window.avatarManager.getAvatarUrl(userId);

// 2. Create image element
const img = new Image();
img.src = avatarUrl;

// 3. Draw on canvas
img.onload = () => {
    const canvas = document.getElementById('my-canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 100, 100);
};
```

### Listen to Avatar Changes

```javascript
// Listen to user data load event
document.addEventListener('userDataLoaded', () => {
    window.avatarManager.updateAllAvatarDisplays();
});

// Or manually trigger updates
window.addEventListener('storage', (e) => {
    if (e.key?.includes('explyra_user_avatar')) {
        window.avatarManager.updateAllAvatarDisplays();
    }
});
```

---

## Styling

### Default Styles

```css
[data-avatar-display] {
    object-fit: cover;
    transition: all 0.3s ease;
}

#modal-avatar-picker {
    animation: slideUp 0.2s ease-out;
}

.receipt-label.drop-zone-active {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.15));
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}
```

### Custom Styling

```css
/* Customize avatar display */
#sidebar-user-avatar {
    border: 2px solid #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

/* Customize modal */
#modal-avatar-picker {
    max-width: 500px;
}

/* Customize upload button */
#btn-avatar-upload {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}
```

---

## Testing

### Run Test Suite

```javascript
// In browser console on emp.html:
runAllAvatarTests();
```

**Tests Included:**
1. Avatar Manager Initialization
2. Avatar URL Retrieval
3. Initials Generation
4. Color Generation
5. DOM Elements Presence
6. LocalStorage Access
7. Modal Functions
8. File Input Handling
9. Firestore Integration
10. Avatar Display Update

---

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile (iOS) | 14+ | ✅ Full |
| Mobile (Android) | 90+ | ✅ Full |

---

## Security Notes

🔒 **Privacy & Security:**
- Images stored locally in browser (no server transfer unless explicitly configured)
- Base64 encoding used for data URLs
- Max file size enforced (5MB)
- File type validation performed
- No third-party tracking
- Firestore integration optional

---

## Performance

📊 **Optimization:**
- Image auto-compression (200x200px max)
- 70% JPEG quality to reduce size
- Lazy loading of avatar picker modal
- LocalStorage for instant access
- CSS transitions for smooth animations

---

## Troubleshooting

### Avatar not showing after upload
- Check browser console for errors
- Verify localStorage available
- Clear browser cache
- Try different image format

### Upload fails
- Verify file is JPEG/PNG/WebP
- Check file size < 5MB
- Ensure browser allows localStorage
- Try different network

### Modal not opening
- Check element ID: `modal-avatar-picker`
- Verify JavaScript loaded: `window.avatarManager`
- Check for console errors
- Try refreshing page

---

## Future Roadmap

- [ ] Cloud storage integration
- [ ] Avatar gallery/templates
- [ ] Image cropping tool
- [ ] Multiple avatar options
- [ ] Avatar animations
- [ ] Group avatars
- [ ] Avatar sharing via link

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Maintained By**: Explyra Team
