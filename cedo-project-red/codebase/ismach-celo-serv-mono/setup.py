from setuptools import setup


setup(
	name='ismach-celo-serv-mono',
	version='1.1',
	py_modules=['cli', 'cli.commands'],
	install_requires=[
		'click',
	],
	entry_points='''
		[console_scripts]
		ismach-celo-serv-mono-cli=cli.cli:cli
	''',
)

