# Avatar System Documentation

## Overview

The Avatar System allows users to upload and manage their profile avatars throughout the Explyra platform. Users can upload custom images or use default initials with auto-generated colors.

## Features

✅ **Default Avatar** - Shows user initials with auto-generated colors
✅ **Custom Avatar Upload** - Upload JPEG, PNG, or WebP images (max 5MB)
✅ **Drag & Drop Support** - Drag image files to upload area
✅ **Image Compression** - Automatic quality optimization (max 200x200px)
✅ **Local Storage** - Avatars saved to browser localStorage
✅ **Database Sync** - Optional sync to Firebase Firestore
✅ **Cross-Platform Display** - Avatar shows in sidebar, header, and profile modal
✅ **Real-time Updates** - Changes reflected instantly across the app

## Structure

```
assets/
└── avatars/         # Avatar storage folder (client-side via localStorage)
    └── [storage managed by JavaScript]

js/
└── avatar-manager.js   # Main avatar management module
```

## Usage

### For Users

1. **Change Avatar**
   - Click the "Change" button in the Profile modal
   - Or open profile from sidebar/header
   - Select "Change Profile Avatar" button
   - Upload an image from your device
   - Drag & drop is supported
   - Click "Upload Avatar" to save
   - Avatar updates immediately across all pages

2. **Reset Avatar**
   - Open profile modal
   - Click "Change Profile Avatar"
   - Click "Reset to Default" button
   - Confirms action with alert
   - Profile returns to initials display

### For Developers

#### Initialize Avatar Manager

```javascript
// Auto-initialized on page load
window.avatarManager = new AvatarManager();
```

#### Get User Avatar

```javascript
// Get avatar URL
const avatarUrl = window.avatarManager.getAvatarUrl(userId);

// Get avatar initials
const initials = window.avatarManager.getAvatarInitials(userName);

// Get avatar background color
const bgColor = window.avatarManager.getAvatarColor(userName);
```

#### Upload Avatar

```javascript
// Upload from file input
const file = document.getElementById('file-input').files[0];
await window.avatarManager.uploadAvatar(file);

// Or from upload function
await window.avatarManager.uploadFromInput();
```

#### Update Display Elements

```javascript
// Update specific element
window.avatarManager.updateAvatarDisplay('element-id');

// Update all avatar displays on page
window.avatarManager.updateAllAvatarDisplays();
```

#### Remove Avatar

```javascript
// With confirmation dialog
await window.avatarManager.removeAvatarConfirm();

// Without confirmation
await window.avatarManager.removeAvatar();
```

## Storage Details

### LocalStorage
- **Key Pattern**: `explyra_user_avatar_{userId}`
- **Value**: Base64 encoded data URL (JPEG, ~25-50KB after compression)
- **Default Expiry**: No expiry (persistent)

### Firestore (Optional)
- **Collection**: `users`
- **Fields**:
  - `avatarUrl`: Base64 data URL
  - `avatarUpdatedAt`: Server timestamp

## HTML Integration

### Avatar Display Elements

Add `data-avatar-display` attribute to any element to enable auto-updates:

```html
<!-- Sidebar Avatar -->
<div id="sidebar-user-avatar" data-avatar-display>?</div>

<!-- Header Avatar -->
<div id="header-profile-avatar" data-avatar-display>?</div>

<!-- Profile Modal Avatar -->
<div id="profile-avatar-display" data-avatar-display>?</div>
```

### Avatar Picker Modal

The system automatically creates and injects `modal-avatar-picker` on load:

```html
<div id="modal-avatar-picker">
    <!-- Upload form with preview -->
</div>
```

Trigger modal:
```javascript
document.getElementById('modal-avatar-picker').classList.remove('hidden');
```

## Styling

### CSS Classes

```css
[data-avatar-display] { ... }           /* Avatar display elements */
.receipt-label.drop-zone-active { ... }  /* Drag & drop active state */
#modal-avatar-picker { ... }            /* Modal animations */
```

### Customization

Change default colors in `avatar-manager.js`:

```javascript
colors: [
    'rgb(59, 130, 246)',   // Blue
    'rgb(34, 197, 94)',    // Green
    'rgb(249, 115, 22)',   // Orange
    // ... add more colors
]
```

Change max file size:

```javascript
maxFileSize: 5 * 1024 * 1024; // 5MB
```

## Error Handling

### Validation

- ✓ File type validation (JPEG, PNG, WebP only)
- ✓ File size validation (max 5MB)
- ✓ Data URL validation
- ✓ Firestore error recovery

### User Feedback

- Toast notifications for success/errors
- Console warnings for fallback scenarios
- Graceful degradation (reverts to initials if upload fails)

## Security

😊 **Data Privacy**
- Images stored locally in browser
- No server upload unless explicitly configured
- User data never exposed to third parties
- Server-side Firestore integration optional

## Browser Support

- ✓ Chrome/Edge 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### Avatar not showing
- Check browser console for errors
- Verify localStorage available: `localStorage.getItem('explyra_user_avatar_' + userId)`
- Clear browser cache and reload

### Upload fails
- Verify file is JPEG, PNG, or WebP
- Check file size < 5MB
- Ensure localStorage not full
- Check browser permissions

### Changes not persisting
- Verify localStorage enabled
- Check for private/incognito mode
- Confirm Firebase configured (for Firestore sync)

## Future Enhancements

- [ ] Cloud storage integration (Google Drive, AWS S3)
- [ ] Avatar gallery/templates
- [ ] Cropping tool before upload
- [ ] Multiple avatar options
- [ ] Avatar animation support
- [ ] Group avatar management
- [ ] Avatar sharing/permissions

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Author**: Explyra Team
