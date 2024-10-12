/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
	output: "export",
	basePath: isGitHubPages ? '/iwb083-code-alphaz' : '',
	assetPrefix: isGitHubPages ? '/iwb083-code-alphaz' : '',
};

export default nextConfig;
