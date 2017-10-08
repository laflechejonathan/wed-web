default: publish

publish: website
	aws s3 sync --acl public-read website s3://kojo2018.jlf-hacks.com
	touch publish
