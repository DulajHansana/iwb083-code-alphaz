/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
	reactStrictMode: true,
	basePath: isGitHubPages ? '/iwb083-code-alphaz' : '',
	assetPrefix: isGitHubPages ? '/iwb083-code-alphaz' : '',
	images: {
		unoptimized: true,
	},
	...(isGitHubPages && { output: "export" })
};

export default nextConfig;
