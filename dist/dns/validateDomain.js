const validateDomain = (domain, userSubdomain) => {
    if (!userSubdomain) return false;
    
    // User's root subdomain: username.mitanshu.tech
    // Valid patterns: username.mitanshu.tech or *.username.mitanshu.tech
    
    const rootSubdomain = `${userSubdomain}.mitanshu.tech`;
    
    if (domain === rootSubdomain) return true;
    if (domain.endsWith(`.${rootSubdomain}`)) return true;
    
    return false;
};

window.validateDomain = validateDomain;
