-- Optional v0.2 patch. Safe to run more than once.
update public.templates
set status = 'ready'
where id = 'service';
