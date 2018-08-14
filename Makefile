default: publish

publish: website
	aws s3 sync --acl public-read website s3://kojo2018.com
	aws cloudfront create-invalidation --distribution-id E2BGWS6KH7RK5E --paths "/*"
	touch publish
