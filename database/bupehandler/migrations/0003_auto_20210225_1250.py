# Generated by Django 3.1 on 2021-02-25 17:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bupehandler', '0002_auto_20210217_1940'),
    ]

    operations = [
        migrations.CreateModel(
            name='Siterecs_hfp_fqhc',
            fields=[
                ('oid', models.IntegerField(primary_key=True, serialize=False)),
                ('name_short', models.CharField(max_length=50)),
                ('name_system', models.CharField(max_length=120)),
                ('name_site', models.CharField(max_length=120)),
                ('admin_office', models.BooleanField()),
                ('street_address', models.CharField(max_length=120)),
                ('loc_suppl', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=30)),
                ('state_usa', models.CharField(max_length=30)),
                ('zip5', models.CharField(max_length=5)),
                ('website', models.URLField()),
                ('phone1', models.CharField(max_length=20)),
                ('phone2', models.CharField(max_length=20)),
                ('date_firstfind', models.DateField()),
                ('date_lastfind', models.DateField()),
                ('data_review', models.CharField(max_length=250)),
            ],
        ),
        migrations.RenameField(
            model_name='sitecodes_samhsa_ftloc',
            old_name='mm_highlights',
            new_name='mm_filters',
        ),
        migrations.RemoveField(
            model_name='siterecs_dbhids_tad',
            name='site_id',
        ),
        migrations.RemoveField(
            model_name='siterecs_samhsa_ftloc',
            name='site_id',
        ),
        migrations.RemoveField(
            model_name='siterecs_samhsa_otp',
            name='site_id',
        ),
        migrations.AddField(
            model_name='sitecodes_samhsa_ftloc',
            name='filter_seq',
            field=models.IntegerField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sitecodes_samhsa_ftloc',
            name='ui_reference',
            field=models.CharField(default=False, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='coe',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='iop',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='loc_suppl',
            field=models.CharField(default=False, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='mat_bupe',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='mat_info',
            field=models.CharField(default=False, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='mat_mtd',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='mat_ntrex',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='mh_tx',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='name_listed',
            field=models.CharField(default=False, max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='op',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='other_notes',
            field=models.CharField(default=False, max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='phone',
            field=models.CharField(default=False, max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='street_address',
            field=models.CharField(default=False, max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='wih_induction',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='siterecs_dbhids_tad',
            name='zip5',
            field=models.CharField(default=False, max_length=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sites_all',
            name='archival_only',
            field=models.BooleanField(blank=True, default=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sites_all',
            name='url_site',
            field=models.URLField(default=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='siterecs_dbhids_tad',
            name='data_review',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='siterecs_samhsa_ftloc',
            name='phone',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='siterecs_samhsa_ftloc',
            name='phone_intake1',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='siterecs_samhsa_ftloc',
            name='phone_intake2',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='siterecs_samhsa_ftloc',
            name='type_facility',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='siterecs_samhsa_otp',
            name='data_review',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='siterecs_samhsa_otp',
            name='phone',
            field=models.CharField(max_length=20),
        ),
        migrations.AddField(
            model_name='sites_all',
            name='hfp_fqhc_id',
            field=models.ForeignKey(default=False, on_delete=django.db.models.deletion.DO_NOTHING, to='bupehandler.siterecs_hfp_fqhc'),
            preserve_default=False,
        ),
    ]
