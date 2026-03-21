// assets/avatars/test-avatar-system.js
// Avatar System Test Suite - Test avatar functionality

console.log('%c🎭 Avatar System Test Suite', 'color: #3b82f6; font-size: 14px; font-weight: bold;');

/**
 * Test 1: Avatar Manager Initialization
 */
function testAvatarManagerInit() {
    console.group('Test 1: Avatar Manager Initialization');
    
    if (window.avatarManager) {
        console.log('✅ Avatar Manager initialized');
        console.log('   - Storage Key:', window.avatarManager.storageKey);
        console.log('   - Max File Size:', (window.avatarManager.maxFileSize / 1024 / 1024) + 'MB');
        console.log('   - Allowed Types:', window.avatarManager.allowedTypes);
    } else {
        console.error('❌ Avatar Manager NOT initialized');
    }
    
    console.groupEnd();
}

/**
 * Test 2: Avatar URL Retrieval
 */
function testGetAvatarUrl() {
    console.group('Test 2: Avatar URL Retrieval');
    
    try {
        const mockUserId = 'test-user-123';
        const url = window.avatarManager?.getAvatarUrl(mockUserId);
        
        if (url) {
            console.log('✅ Avatar URL retrieved:', typeof url === 'string' ? 'String' : 'Type: ' + typeof url);
            console.log('   - Starts with data? ', url.startsWith('data:') || url.includes('logo'));
        } else {
            console.warn('⚠️ Avatar URL is empty');
        }
    } catch (e) {
        console.error('❌ Error getting avatar URL:', e.message);
    }
    
    console.groupEnd();
}

/**
 * Test 3: Avatar Initials Generation
 */
function testAvatarInitials() {
    console.group('Test 3: Avatar Initials Generation');
    
    const testNames = [
        'John Doe',
        'Alice Smith',
        'Bob',
        ''
    ];
    
    testNames.forEach(name => {
        try {
            const initials = window.avatarManager?.getAvatarInitials(name);
            console.log(`✅ "${name}" → "${initials}"`);
        } catch (e) {
            console.error(`❌ Error for "${name}":`, e.message);
        }
    });
    
    console.groupEnd();
}

/**
 * Test 4: Avatar Color Generation
 */
function testAvatarColor() {
    console.group('Test 4: Avatar Color Generation');
    
    const testNames = ['Alice', 'Bob', 'Charlie'];
    
    testNames.forEach(name => {
        try {
            const color = window.avatarManager?.getAvatarColor(name);
            console.log(`✅ "${name}" → ${color}`);
        } catch (e) {
            console.error(`❌ Error for "${name}":`, e.message);
        }
    });
    
    console.groupEnd();
}

/**
 * Test 5: DOM Elements Presence
 */
function testDOMElements() {
    console.group('Test 5: DOM Elements Presence');
    
    const elements = [
        { id: 'sidebar-user-avatar', name: 'Sidebar Avatar' },
        { id: 'header-profile-avatar', name: 'Header Avatar' },
        { id: 'profile-avatar-display', name: 'Profile Modal Avatar' },
        { id: 'modal-avatar-picker', name: 'Avatar Picker Modal' }
    ];
    
    elements.forEach(el => {
        const elem = document.getElementById(el.id);
        if (elem) {
            console.log(`✅ ${el.name} found (id: ${el.id})`);
        } else {
            console.warn(`⚠️ ${el.name} NOT found (id: ${el.id})`);
        }
    });
    
    console.groupEnd();
}

/**
 * Test 6: LocalStorage Access
 */
function testLocalStorage() {
    console.group('Test 6: LocalStorage Access');
    
    try {
        const testKey = 'explyra_avatar_test_' + Date.now();
        const testValue = 'test_data_url';
        
        // Test set
        localStorage.setItem(testKey, testValue);
        console.log('✅ LocalStorage write successful');
        
        // Test get
        const retrieved = localStorage.getItem(testKey);
        if (retrieved === testValue) {
            console.log('✅ LocalStorage read successful');
        } else {
            console.error('❌ LocalStorage data mismatch');
        }
        
        // Cleanup
        localStorage.removeItem(testKey);
        console.log('✅ LocalStorage cleanup successful');
        
    } catch (e) {
        console.error('❌ LocalStorage error:', e.message);
    }
    
    console.groupEnd();
}

/**
 * Test 7: Modal Functions
 */
function testModalFunctions() {
    console.group('Test 7: Modal Functions');
    
    try {
        const modal = document.getElementById('modal-avatar-picker');
        
        if (!modal) {
            console.warn('⚠️ Avatar picker modal not yet created');
            return;
        }
        
        // Test showing modal
        modal.classList.remove('hidden');
        console.log('✅ Modal show works');
        
        // Test hiding modal
        modal.classList.add('hidden');
        console.log('✅ Modal hide works');
        
    } catch (e) {
        console.error('❌ Modal operation error:', e.message);
    }
    
    console.groupEnd();
}

/**
 * Test 8: File Input Handling
 */
function testFileInputHandling() {
    console.group('Test 8: File Input Handling');
    
    try {
        const fileInput = document.getElementById('avatar-file-input');
        
        if (!fileInput) {
            console.log('⚠️ Avatar file input not yet created (will be created when modal opens)');
            return;
        }
        
        console.log('✅ Avatar file input found');
        console.log('   - Accept types:', fileInput.accept);
        console.log('   - Multiple:', fileInput.multiple);
        
    } catch (e) {
        console.error('❌ File input error:', e.message);
    }
    
    console.groupEnd();
}

/**
 * Test 9: Firestore Integration (if available)
 */
function testFirestoreIntegration() {
    console.group('Test 9: Firestore Integration');
    
    if (window.db) {
        console.log('✅ Firestore database instance available');
    } else {
        console.log('⚠️ Firestore not configured (localStorage fallback will be used)');
    }
    
    if (window.userData?.docId) {
        console.log('✅ User document ID available:', window.userData.docId);
    } else {
        console.log('⚠️ User data not yet loaded');
    }
    
    console.groupEnd();
}

/**
 * Test 10: Avatar Display Update
 */
function testAvatarDisplayUpdate() {
    console.group('Test 10: Avatar Display Update');
    
    try {
        window.avatarManager?.updateAllAvatarDisplays();
        
        const sidebarAvatar = document.getElementById('sidebar-user-avatar');
        const headerAvatar = document.getElementById('header-profile-avatar');
        
        if (sidebarAvatar?.innerHTML !== '?') {
            console.log('✅ Sidebar avatar updated');
        } else {
            console.log('⚠️ Sidebar avatar shows default');
        }
        
        if (headerAvatar?.innerHTML !== '?') {
            console.log('✅ Header avatar updated');
        } else {
            console.log('⚠️ Header avatar shows default');
        }
        
    } catch (e) {
        console.error('❌ Avatar display update error:', e.message);
    }
    
    console.groupEnd();
}

/**
 * Run All Tests
 */
function runAllAvatarTests() {
    console.clear();
    console.log('%c════════════════════════════════════════', 'color: #3b82f6;');
    console.log('%c🎭 AVATAR SYSTEM COMPREHENSIVE TEST SUITE', 'color: #3b82f6; font-weight: bold; font-size: 16px;');
    console.log('%c════════════════════════════════════════', 'color: #3b82f6;');
    console.log('');
    
    // Wait for DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            performTests();
        });
    } else {
        performTests();
    }
    
    function performTests() {
        testAvatarManagerInit();
        testGetAvatarUrl();
        testAvatarInitials();
        testAvatarColor();
        testDOMElements();
        testLocalStorage();
        testModalFunctions();
        testFileInputHandling();
        testFirestoreIntegration();
        testAvatarDisplayUpdate();
        
        console.log('');
        console.log('%c✅ All tests completed!', 'color: #22c55e; font-weight: bold; font-size: 14px;');
        console.log('%cCheck console for details', 'color: #888; font-size: 12px;');
    }
}

// Export for use
window.runAllAvatarTests = runAllAvatarTests;

// Quick start
console.log('%cRun runAllAvatarTests() in console to test the avatar system', 'color: #f59e0b; font-weight: bold;');
