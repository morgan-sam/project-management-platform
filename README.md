<h3>Project Management Platform</h3>
<p>PMP is a platform for managing task lists for projects.</p>

<h3>Usage</h3>
<h4>Batching New Tasks</h4>
<p>Multiple tasks can be added to the database by using a single template.</p>
<p>The syntax of the templating is listed below:</p>
<h4>Task</h4>
<p><code>${n/l, #, a/d}</code></p>
<p>
  Where: 
  <ul>
    <li><code>n</code> is number, <code>l</code> is letter</li>
    <li><code>#</code> is number of digits, (skipped for letter)</li>
    <li><code>a</code> is ascending, <code>d</code> is descending</li>
  </ul>
</p>
<h4>Date/Deadline</h4>
<p><code>${#/#/#} +/- # n d/w/m/y</code></p>
<p>
  Where: 
  <ul>
    <li><code>${#/#/#}</code> is the date/month/year (use <code>t</code> instead of a number for today's date/month/year)</li>
    <li><code><code>+</code> or <code>-</code></code> is whether the date modification is added or subtracted</li>
    <li><code>#</code> is the date modification multiplier</li>
    <li><code>n</code> is the task number index (leave out for static modification)</li>
    <li><code>d/w/m/y</code> is the unit of the modification (day, week, month or year)</li>
  </ul>
</p>
<p>Note:</p>
<BLOCKQUOTE><code>${t}</code> is shorthand for <code>${t/t/t}</code>, today's date.</BLOCKQUOTE>

<h3>To Do</h3>
<p>Authentification is not yet implemented. Once implemented the manager account will be able to view the complete task list and assign tasks to individual teams. A team account will only be able to view the tasks assigned to them and tick them off as they are completed.</p>
